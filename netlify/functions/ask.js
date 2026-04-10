// netlify/functions/ask.js
exports.handler = async (event) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API key not configured. Add ANTHROPIC_API_KEY in Netlify environment variables.' })
    };
  }

  let question;
  try {
    const body = JSON.parse(event.body);
    question = body.question;
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body' }) };
  }

  if (!question || typeof question !== 'string' || question.length > 1000) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Please provide a valid question (under 1000 characters).' }) };
  }

  const GUIDE_CONTENT = `
INVENTORY & COGS AUDITING GUIDE

1. Identifying Non-Categorized Items
Items may be categorized as 'other' or 'new item'. If not categorized correctly, your category totals will be deflated.
Steps:
- Navigate to your items page
- Group by 'category'
- Use the collapse all tool (top right of items page)
- Expand any incorrect category headers
- Use checkboxes to highlight similar items (e.g. all Wine)
- Bulk edit & assign all selected items to the desired category

2. Identifying $0 Cost Items
Some items may have been counted in inventory but have no assigned cost in BevSpot. These items deflate your sitting inventory value.
Steps:
- Open your finalized inventory and navigate to Count Summary
- Settings: Group by All Items, Compare to Current Value, Sort Current Value low to high
- Items at top with $0 value but a count are items of concern
- To correct: Confirm current purchase price, update price on item card, edit cost within current inventory
- Access item card and cost editor via the three vertical dots next to the item
- Note: if inventory is not finalized, updating the item card alone is sufficient

These steps can also identify cost anomalies by sorting Current Value high to low.

3. Identifying Erroneous High Usage
Miscounts (e.g., counting a case instead of a bottle) can significantly distort usage data.
Steps:
- Open finalized inventory, navigate to Count Summary
- Settings: Group by All Items, Compare to Prior Inventory, Sort Usage high to low
- Review highest usage items. Hover over Usage figure to see calculation
- Check if counts, deliveries, transfers, or preps make sense
- Repeat sorting Usage low to high (negative/red items = unexplained inventory gain)

Common causes: Missing delivery/transfer or date error, duplicate item with split COGS, miscount, no prior usage history.
Example: 10 cases counted instead of 10 bottles inflates inventory by 230 units and shows -230 usage.

4. Using the COGS Report
Steps:
- Navigate to Reports > Cost of Goods Sold report
- Confirm inventory date parameters are correct
- Identify flagged items & correct (significant inventory cost vs current price)
- Scroll past summary graph to item-by-item COGS table
- Sort by usage and COGS, both high to low and low to high
- Focus on top items (greatest impact on monthly COGS)
Notes: Report is dynamic and uses purchase price closest to ending inventory. Only items with assigned storage areas appear.

5. Correcting Flagged Item Cost
Items with a red flag have significant difference between purchase price (most recent) and cost (price when inventory was finalized).
Steps:
- Identify flagged item on Cost of Goods page
- Navigate to most recent inventory Count Summary page
- Search for item & hover over red flag to see discrepancy details
- Confirm if cost OR price is correct via item card history (three dots menu)
- If cost incorrect: use three dots to edit and correct cost
- If price incorrect: review last purchase invoice

---

ENTERPRISE SALES VARIANCE ANALYSIS GUIDE

Running the Report:
If POS is integrated with BevSpot:
- Navigate to Sales > History > Run New Report
- Set starting and ending inventories for the period

If POS is NOT integrated:
- Log in to POS dashboard, find detailed sales report (PMIX)
- Export to Excel (dates must match inventory dates)
- Send to pmixenterprise@bevspot.com with BevSpot ID in subject line
- Allow ~12 hours for import

Find reports under Sales > History in BevSpot.

Mapping Sales Items:
- Navigate to POS Data tab at top of Sales Variance Report
- Group By dropdown > mapping status (unmapped vs mapped)
- Select 'unmapped' to pull up sales items
- Note item name, menu group & price, add all ingredients and volumes/weights
- Each ingredient has a cost from BevSpot
- Once all mapped, ready for analysis

Variance Analysis:
Variance = difference between actual COGS (actual usage) and anticipated sales (theoretical usage).
Anticipated sales = POS sales x ingredient depletion from mapping.

1. Reviewing N/A Items
- Navigate to Variance tab
- Group by All Items, sort variance ($) negative to positive
- Identify N/A items in variance column
- Search for duplicates or deleted items
- Consolidate/remove duplicates, may require remapping on POS Data page

2. Investigating Items Above Variance Threshold
Set threshold (e.g. $100) and check each item exceeding it:
- Package sizing & unit cost: Confirm correct
- Sold (units) / mapping accuracy: Hover over Sold figure, check if negative (missing/unmapped sales items)
- Usage (units): Check ending inventory counts, deliveries (verify on History page), starting inventory (look for bounce-back offset with prior report)
- If all checks pass, arrange physical recount

3. Repeat Until Complete
Continue investigating items above threshold. Each correction may affect adjacent items, so re-review after changes.
If variance remains high but data is verified, investigate: theft, delivery shorting, portion control / overpouring / underpouring.

Profit Analysis:
- Navigate to Profit tab at top of sales variance report
- Foundation is POS Data & mapping
- Use 'group by' and column filtering to identify:
  - Cost %: Lower cost % = higher margin
  - Profitability Rank: Highest net profit items for the cycle
- Use to improve cost % & profit through menu engineering and marketing
`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: `You are a BevSpot support assistant. Answer questions ONLY using the guide content provided below. Be clear, concise, and give step-by-step instructions when applicable. Use simple HTML for formatting: <h3> for section titles, <p> for paragraphs, <ol>/<li> for numbered steps, <strong> for emphasis on key UI elements or important terms. If the question is not covered by the guides, say so politely and suggest what topics you can help with (categorization, $0 cost items, usage errors, COGS report, flagged items, sales variance, mapping, profit analysis).

GUIDE CONTENT:
${GUIDE_CONTENT}`,
        messages: [{ role: 'user', content: question }]
      })
    });

    const data = await response.json();

    if (data.error) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: data.error.message || 'API error' })
      };
    }

    const answer = data.content
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('');

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer })
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to reach the AI service. Please try again.' })
    };
  }
};

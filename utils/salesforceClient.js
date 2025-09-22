const jsforce = require("jsforce");

async function fetchSalesforceData(idea) {
  const conn = new jsforce.Connection({ loginUrl: "https://login.salesforce.com" });
  await conn.login(process.env.SALESFORCE_USERNAME, process.env.SALESFORCE_PASSWORD + process.env.SALESFORCE_TOKEN);

  const accounts = await conn.sobject("Account").find({ Name: { $like: \`%\${idea}%\` } }).limit(5);
  const opportunities = await conn.sobject("Opportunity").find({ Name: { $like: \`%\${idea}%\` } }).limit(5);

  return { accounts, opportunities };
}

module.exports = { fetchSalesforceData };


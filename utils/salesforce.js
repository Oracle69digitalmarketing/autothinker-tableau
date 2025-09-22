// utils/salesforce.js
const jsforce = require("jsforce");
require("dotenv").config();

async function pushToSalesforce(data) {
  try {
    const conn = new jsforce.Connection({
      loginUrl: "https://login.salesforce.com",
    });

    await conn.login(
      process.env.SF_USERNAME,
      process.env.SF_PASSWORD + process.env.SF_TOKEN
    );

    const result = await conn.sobject("Business_Idea__c").create({
      Name: data.idea_name,
      Category__c: data.category,
      SWOT_Strength__c: data.SWOT_strength,
      SWOT_Weakness__c: data.SWOT_weakness,
      Opportunity_Score__c: data.opportunity_score,
      Threat_Score__c: data.threat_score,
      Predicted_Revenue__c: data.predicted_revenue,
      Top_Actions__c: JSON.stringify(data.top_actions),
    });

    console.log("Salesforce push successful:", result);
  } catch (err) {
    console.error("Error pushing to Salesforce:", err);
  }
}

module.exports = { pushToSalesforce };

# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here
<hr />
<br />

### Ticket 1: Update Agent Table to Include Custom IDs (agent_id)

**Description:**

Currently, the system uses auto generated primary key from database to identify Agents, exposing primary key is dangerous. To solve this problem we need to add new column named agent_id(unique key) with some auto incremented mechanism. For example AG_0000000001, AG_0000000002 ....

> Acceptance Criteria:

- Alter Agent Table by adding new column agent_id
- The agent_id field is unique to ensure each Agent has a unique custom ID within a Facility.
- The existing Agents' data is migrated to agent_id if available.

> Effort Estimate: 3 hours

> Technical Implementation:

- Modify the Agent table schema by adding a new column agent_id using an appropriate data type (varchar).
- Ensure the agent_id field does not allow null values.
- Set the agent_id  field as a unique constraint to prevent duplicate agent_id within a Facility.
- Write a database migration script to update the existing Agents' data, populating the agent_id  field if available.

```
// Generates the 10 digit key in ASC order
// Note - This function can be changed
const generateAgentNextKey = (currentKey === 'AG_0000000000') => {
  const numericPart = Number(currentKey.slice(3));
  const incrementedNumericPart = numericPart + 1;
  const paddedNumericPart = String(incrementedNumericPart).padStart(10, '0');
  return `AG_${paddedNumericPart}`;
}


const lastRecord = await Agent.findOne({}, { sort: { _id: -1 } });
const nextAgentId =  generateAgentNextKey (lastRecord?.agent_id);

await Agent.create({agent_id: nextAgentId, ..... })

```
<br/>
<hr />
<br/>

### Ticket 2: Update Report Generation to Use agent_id

***Description:***

Currently, the reports generated use the primary key(ID) of Agents. This ticket involves updating the report generation process to use agent_id provided by Facilities.

***Acceptance Criteria:*** 

- The `generateReport` function is updated to retrieve the agent_id of each Agent from the Agent table based on primary key(ID).
- The agent_id is used in the report generation to show in report instead of the primary key (ID).

***Effort Estimate:*** 1-2 hours

***Technical Implementation:***

- Modify the `generateReport` function to include an additional step to retrieve the agent_id of each Agent.
- Query the Agent table using the primary key(ID) to retrieve the corresponding agent_id.
- Update the report generation logic to use the agent_id instead of the primary key(ID) when displaying Agent information in the report.

<br/>
<hr />
<br/>

### Ticket 3: Update `getShiftsByFacility` Metadata Retrieval to Include agent_id

***Description:***

When retrieving Shifts for report generation, the metadata about the assigned Agents should include their agent_id.

***Acceptance Criteria:***

- Modify the `getShiftsByFacility` function to include the `agent_id` of the assigned Agents in the Shift metadata.
- The `agent_id` is returned along with other relevant Agent information.

***Effort Estimate:*** 2 hours

***Implementation Details:***

- Update the database query in the `getShiftsByFacility` function to include the `agent_id` field from the Agent table.

- Modify the data structure or response format of the `getShiftsByFacility` function to include the `agent_id` in the Shift metadata.

Note: The time/effort estimates provided are approximate and may vary depending on the specific implementation details.
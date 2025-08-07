import testBettingSlip from "./test-betting-slip.js";

async function testApiEndpoints() {
  const baseUrl = "http://localhost:3001/api/betting-slips";

  try {
    console.log("Testing API endpoints...\n");

    // Test 1: Save a betting slip
    console.log("1. Testing POST /api/betting-slips (Save betting slip)");
    const saveResponse = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testBettingSlip),
    });

    const saveResult = await saveResponse.json();
    console.log("Save result:", saveResult);

    if (!saveResponse.ok) {
      throw new Error(`Failed to save betting slip: ${saveResult.message}`);
    }

    const slipId = saveResult.id;
    console.log(`Successfully saved betting slip with ID: ${slipId}\n`);

    // Test 2: Get all betting slips
    console.log("2. Testing GET /api/betting-slips (Get all betting slips)");
    const getAllResponse = await fetch(baseUrl);
    const getAllResult = await getAllResponse.json();
    console.log("Get all result:", getAllResult);

    if (!getAllResponse.ok) {
      throw new Error(`Failed to get betting slips: ${getAllResult.message}`);
    }

    console.log(`Retrieved ${getAllResult.data.length} betting slips\n`);

    // Test 3: Get specific betting slip
    console.log(
      "3. Testing GET /api/betting-slips/:id (Get specific betting slip)"
    );
    const getOneResponse = await fetch(`${baseUrl}/${slipId}`);
    const getOneResult = await getOneResponse.json();
    console.log("Get one result:", getOneResult);

    if (!getOneResponse.ok) {
      throw new Error(`Failed to get betting slip: ${getOneResult.message}`);
    }

    console.log(`Retrieved betting slip with ID: ${getOneResult.data.id}\n`);

    // Test 4: Update betting slip
    console.log("4. Testing PUT /api/betting-slips/:id (Update betting slip)");
    const updatedSlip = {
      ...testBettingSlip,
      totalOdds: 3.5,
      paripesaCode: "updated123",
    };

    const updateResponse = await fetch(`${baseUrl}/${slipId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSlip),
    });

    const updateResult = await updateResponse.json();
    console.log("Update result:", updateResult);

    if (!updateResponse.ok) {
      throw new Error(`Failed to update betting slip: ${updateResult.message}`);
    }

    console.log(`Successfully updated betting slip with ID: ${slipId}\n`);

    // Test 5: Delete betting slip
    console.log(
      "5. Testing DELETE /api/betting-slips/:id (Delete betting slip)"
    );
    const deleteResponse = await fetch(`${baseUrl}/${slipId}`, {
      method: "DELETE",
    });

    const deleteResult = await deleteResponse.json();
    console.log("Delete result:", deleteResult);

    if (!deleteResponse.ok) {
      throw new Error(`Failed to delete betting slip: ${deleteResult.message}`);
    }

    console.log(`Successfully deleted betting slip with ID: ${slipId}\n`);

    console.log("All API tests passed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("API test failed:", error.message);
    process.exit(1);
  }
}

testApiEndpoints();

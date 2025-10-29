// Simple test script to verify API endpoints
// Run this in your browser console when your dev server is running

async function testAPI() {
	console.log('Testing API endpoints...');

	// Test 1: Check a voter that doesn't exist
	try {
		const response = await fetch('/api/check-voter?voterId=123456');
		const data = await response.json();
		console.log('Check voter (new):', data); // Should be { hasVoted: false }
	} catch (error) {
		console.error('Error checking voter:', error);
	}

	// Test 2: Submit a vote
	try {
		const response = await fetch('/api/submit-vote', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				voterId: 123456,
				candidateNumber: 10,
			}),
		});
		const data = await response.json();
		console.log('Submit vote:', data); // Should be { success: true, message: "Vote recorded successfully" }
	} catch (error) {
		console.error('Error submitting vote:', error);
	}

	// Test 3: Check the same voter again
	try {
		const response = await fetch('/api/check-voter?voterId=123456');
		const data = await response.json();
		console.log('Check voter (existing):', data); // Should be { hasVoted: true }
	} catch (error) {
		console.error('Error checking voter:', error);
	}

	// Test 4: Try to vote again (should fail)
	try {
		const response = await fetch('/api/submit-vote', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				voterId: 123456,
				candidateNumber: 20,
			}),
		});
		const data = await response.json();
		console.log('Submit duplicate vote:', response.status, data); // Should be 409 with error
	} catch (error) {
		console.error('Error submitting duplicate vote:', error);
	}
}

testAPI();

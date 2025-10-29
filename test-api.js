// Simple test script to verify API endpoints
// Run this in your browser console when your dev server is running

async function testAPI() {
	// Test 1: Check a voter that doesn't exist
	try {
		const response = await fetch('/api/check-voter?voterId=123456');
		const data = await response.json();
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
	} catch (error) {
		console.error('Error submitting vote:', error);
	}

	// Test 3: Check the same voter again
	try {
		const response = await fetch('/api/check-voter?voterId=123456');
		const data = await response.json();
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
	} catch (error) {
		console.error('Error submitting duplicate vote:', error);
	}
}

testAPI();

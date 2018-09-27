// Import the list of friend entries
var friends = require('../data/friends');

// Export API routes
module.exports = function(app) {
	// console.log('___ENTER apiRoutes.js___');

	// Total list of friend entries
	app.get('/api/friends', function(req, res) {
		res.json(friends);
	});

	// Add new friend entry
	app.post('/api/friends', function(req, res) {
		var userData = req.body;
		var userScores = userData.scores;

		// Compute best friend match
		var match = {
			name: "",
			photo: "",
			friendDifference: Infinity
		};
		var totalDifference; // Make the initial value big for comparison

		// Examine all existing friends in the list
		for (var i = 0; i < friends.length; i++) {
			var currentFriend = friends[i];
			totalDifference = 0;
	  
			console.log(currentFriend.name);
	  
			// We then loop through all the scores of each friend
			for (var j = 0; j < currentFriend.scores.length; j++) {
			  var currentFriendScore = currentFriend.scores[j];
			  var currentUserScore = userScores[j];
	  
			  // We calculate the difference between the scores and sum them into the totalDifference
			  totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
			}
	  
			// If the sum of differences is less then the differences of the current "best match"
			if (totalDifference <= match.friendDifference) {
			  // Reset the bestMatch to be the new friend.
			  match.name = currentFriend.name;
			  match.photo = currentFriend.photo;
			  match.friendDifference = totalDifference;
			}
		  }

		// Add new user
		friends.push(userData);

		// Send appropriate response
		res.json(match);
	});
};
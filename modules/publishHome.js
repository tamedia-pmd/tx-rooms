async function publishHome(user_id, homeView, token) {  
    const payload = {
      view: homeView,
      token: token,
      user_id: user_id
    }
  
    return await fetch('https://slack.com/api/views.publish', {
      method: 'post',
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(function (data) {
      console.log('Request succeeded with JSON response', data);
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });
  }

  module.exports = publishHome;
export const setToken = (user) =>{
    const CurrentUser = {
        email: user.email
    }
     // get jwt token
fetch('https://y-lac-xi.vercel.app/jwt', {
method: 'POST',
headers: {
  'content-type': 'application/json'
},
body:JSON.stringify(CurrentUser)
})
.then(res => res.json())
.then(data => {
console.log(data);
// localStorage is the easiest but not secure 
localStorage.setItem('genius-token', data.token);
})
}
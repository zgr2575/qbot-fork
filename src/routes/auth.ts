import { Router } from 'itty-router';
const router = Router({ base: '/auth' });

router.get('/login', async (req) => {
  return new Response(`<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous"> <style>html, body{height: 100%;}.layout{background-color: #e2e8f0;}.panel{background-color: white; padding: 35px; border-radius: 0.5rem;}</style> <title>Login to Qbot</title></head><body> <div class="layout h-100 d-flex align-items-center justify-content-center"> <div class="panel"> <h2>Admin Login</h2> <p>Configure your Qbot instance to your liking. <form class="mt-3" id="passwordForm" method="post"> <label for="password" class="form-label">Password</label> <input type="password" class="form-control" id="password" name="password"> <div class="form-text">This is the admin password you provided when creating your Qbot instance.</div><button type="submit" class="btn btn-primary mt-3">Login</button> </form> </div></div><script>const form=document.getElementById('passwordForm'); form.addEventListener('submit', (e)=>{e.preventDefault(); const password=document.getElementById('password').value; fetch('/auth/login',{method: 'POST', headers:{'Content-Type': 'application/json'}, body: JSON.stringify({password: password})})}); </script></body></html>`, {
    status: 401,
    headers: {
      'content-type': 'text/html; charset=UTF-8',
    },
  });
});

router.post('/login', async (req) => {
  const content = await req.json()
  const url = new URL(req.url);
  url.pathname = '/config';
  return new Response('', {
    status: 302,
    headers: {
      'Location': url.toString(),
      'Set-Cookie': `password=${content.password};`,
    }
  })
});

export { router };
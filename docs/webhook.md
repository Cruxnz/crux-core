# Webhooks with Github

We want to set up a webhook every time we merge a PR with staging/production, so that our new code is pushed to the respective server.

First, install https://github.com/adnanh/webhook on the relevant machine.

`sudo apt-get install golang`

Set the $GOPATH by:

`sudo nano ~/.bashrc`

Add the line "export GOPATH=$HOME/go".

`source ~/.bashrc`

Now run `go get github.com/adnanh/webhook`.

Example `hooks.json` file:

```json
[
  {
    "id": "deploy-staging",
    "execute-command": "/root/deploy.sh"
  }
]
```

Deploy script at `/root/deploy.sh`:

```sh
#!/usr/bin/env bash

echo fuck
```

`chmod +x /root/deploy.sh`

To test, run `~/go/bin/webhook -hooks hooks.json -verbose`

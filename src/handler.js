import ws from 'aws-lambda-ws-server'

export const handler = ws(
  ws.handler({
    // Connect
    async connect ({ id, event, context }) {
      return { statusCode: 200, body: 'Connected.' }
    },
  
    // Disconnect
    async disconnect ({ id, event }) {
      return { statusCode: 200, body: 'Disconnected.' }
    },

    async default ({message, id, event, context}) {
      return { statusCode: 200, body: 'Data sent.' }
    }
  })
)


/*
	A very simple tail worker that puts exceptions, cpu limit errors and other info to a KV namespace.
	Yes, this is not how a real tail worker should save logs. This is not queryable & doesn't scale.
*/

export default {
  async tail(events, env) {
    for (const event of events) {
      switch (event.outcome) {
        case "exceededCpu":
			console.log('Logging `exceededCpu` report')
          await env.KV.put(`exceededCpu:${new Date().toISOString()}`, JSON.stringify(event), {
            expirationTtl: 259200 /* 3 days */,
          });
          break;

        case "exception":
		  console.log('Logging `exceptions` report')
          await env.KV.put(`exceptions:${new Date().toISOString()}`, JSON.stringify(event) , {
            expirationTtl: 259200 /* 3 days */,
          });
          break;

		default: 
		console.log('Logging unknown report')
         await env.KV.put(`unknown:${new Date().toISOString()}`, JSON.stringify(event), {
            expirationTtl: 259200 /* 3 days */,
          });
          break;
      }
    }
  },
} satisfies { tail: ExportedHandlerTailHandler<Env> };

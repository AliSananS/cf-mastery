export const logger = {
    log(msg: string, req: { url?: string, method?: string } | undefined = {}) {
        console.log({
            level: "info", msg, timestamp: new Date().toISOString(), attributes: req && {
                url: req.url,
                method: req.method,
            }
        })
    },
    warn(msg: string, req: { url?: string, method?: string } | undefined = {}) {
        console.log({
            level: "warn", msg, timestamp: new Date().toISOString(), attributes: req && {
                url: req.url,
                method: req.method,
            }
        })
    },
    error(msg: string, req: { url?: string, method?: string } | undefined = {}) {
        console.log({
            level: "error", msg, timestamp: new Date().toISOString(), attributes: req && {
                url: req.url,
                method: req.method,
            }
        })
    },
}
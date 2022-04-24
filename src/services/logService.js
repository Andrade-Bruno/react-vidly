// import * as Sentry from "@sentry/react";
// import { BrowserTracing } from "@sentry/tracing";
import { toast } from 'react-toastify';

function init() {
    // Sentry.init({
    //     dsn: "https://9f4c64556a4845618167bc416c2569d6@o1217820.ingest.sentry.io/6359946",
    //     integrations: [new BrowserTracing()],

    //     // Set tracesSampleRate to 1.0 to capture 100%
    //     // of transactions for performance monitoring.
    //     // We recommend adjusting this value in production
    //     tracesSampleRate: 1.0,
    // });
}

function logError(error) {
    // Sentry.captureException(error)

    toast.error(error)
}

export default {
    init,
    logError
}
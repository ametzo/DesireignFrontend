// VITE_NODE_ENV = PROD_LIVE, PROD_LOCAL, TEST_LIVE, TEST_LOCAL
const testLocal = {
    SERVER_URL: "http://localhost:8188",
    COMPANY_NAME: "Desireign",
    IMAGE_URL: "http://localhost:8188",
    COMPANY_FAVICON: "http://localhost:8188/public/images/logoNoBg.png",
};

const devLive = {
    SERVER_URL: "https://appapi.desireign.com",
    COMPANY_NAME: "Desireign",
    IMAGE_URL: "https://appapi.desireign.com",
    COMPANY_FAVICON: "https://appapi.desireign.com/public/images/logoNoBg.png",
};

export const config =
    import.meta.env.VITE_NODE_ENV === "PROD_LIVE" ? devLive : testLocal;

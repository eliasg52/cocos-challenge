const tradingApi = {
  getInstruments: async () => {
    try {
      const response = await fetch(
        "https://dummy-api-topaz.vercel.app/instruments"
      );
      return response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  },
};

export default tradingApi;

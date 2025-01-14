// store/store.ts
import { create } from 'zustand';

interface CountryData {
  currency: string;
  currencySymbol: string;
}

interface CounterState {
  country: string;
  countryDetails: CountryData;
  changeCountry: () => void;
}

const countryInfo: Record<string, CountryData> = {
  IN: { currency: "INR", currencySymbol: "₹" },
  KWT: { currency: "KWD", currencySymbol: "KD" },
};

const userStore = create<CounterState>((set) => ({
  country: "KWT", // Initialize with default country
  countryDetails: countryInfo["KWT"], // Set initial country details
  changeCountry: () =>
    set((state) => {
      const newCountry = state.country === "IN" ? "KWT" : "IN";
      return { country: newCountry, countryDetails: countryInfo[newCountry] };
    }),
}));

export default userStore;

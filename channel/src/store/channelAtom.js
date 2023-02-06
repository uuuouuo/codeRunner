import { atom, selector } from "recoil";
import axios from "axios";
export const channelAtom = atom({
  key: "channelAtom",
  default: "",
});

export const channelSelector = selector({
  key: "channelList",
  get: async () => {
    try {
      const { data } = await axios.get("http://localhost:8085/channel/get");
      return data;
    } catch (err) {
      console.error(err);
    }
  },
  set: ({ set }, newValue) => set(channelAtom, newValue),
});

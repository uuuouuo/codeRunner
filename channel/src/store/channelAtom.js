import { atom, selector } from "recoil";
import axios from "axios";
export const channelListAtom = atom({
  key: "channelAtom",
  default: "",
});

export const channelListSelector = selector({
  key: "channelList",
  get: async () => {
    try {
      const { data } = await axios.get("http://localhost:8083/channel/get");
      return data;
    } catch (err) {
      console.error(err);
    }
  },
  set: ({ set }, newValue) => set(channelListAtom, newValue),
});

export const channelDataSelector = selector({
  key: "channelData",
  get: "",
});

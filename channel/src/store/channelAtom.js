import { atom, selector, selectorFamily } from "recoil";
import axios from "axios";

export const channelListAtom = atom({
  key: "channelList",
  default: "",
});
export const channelDataAtom = atom({
  key: "channelData",
  default: "",
});

export const channelMembersAtom = atom({
  key: "channelMembers",
  default: "",
});

export const channelListSelector = selector({
  key: "channelListSelector",
  get: async () => {
    try {
      const { data } = await axios.get("http://localhost:8083/channel/get");
      return data;
    } catch (err) {
      console.error(err);
    }
  },
});

export const channelMemberSelector = selectorFamily({
  key: "channelMemberSelector",
  get: (id) => async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8083/channel/${id}/users/get`
      );
      return data;
    } catch (err) {
      console.error(err);
    }
  },
});

export const channelDataSelector = selectorFamily({
  key: "channelDataSelector",
  get: (id) => async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8083/channel/${id}/get`
      );
      return data;
    } catch (err) {
      console.err(err);
    }
  },
  set: ({ set }, newValue) => set(channelDataAtom, newValue),
});

import { useRecoilRefresher_UNSTABLE } from "recoil";

const useRecoilRefresh = (channelListSelector) => {
  const refresher = useRecoilRefresher_UNSTABLE(channelListSelector);
  return refresher;
};

export default useRecoilRefresh;

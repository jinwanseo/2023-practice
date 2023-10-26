import { useAppDispatch, useAppSelector } from "app/store";
import { setLoadingState } from "app/store/slices/styleSlice";

const useLoading = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.style);

  const setLoading = () => {
    dispatch(setLoadingState(!loading));
  };

  return { loading, setLoading };
};

export default useLoading;

import axios from "axios";
import { set } from "date-fns";
import { useEffect, useState } from "react";
import { config } from "../configs";
import { useDispatch } from "react-redux";
import * as Action from "../features/questionSlice";

export const useFetchQuestion = (kd_soal) => {
  const dispatch = useDispatch();
  const [getData, setGetData] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  });

  useEffect(() => {
    setGetData((prev) => ({ ...prev, isLoading: true }));

    (async () => {
      try {
        let question = await axios.get(
          `${config.api_host_dev}/api/v1/cms/soal/${kd_soal}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (question.data.data.length > 0) {
          setGetData((prev) => ({ ...prev, apiData: question.data.data }));
          setGetData((prev) => ({ ...prev, isLoading: false }));
          dispatch(Action.startExamAction(question.data.data));
        } else {
          throw new Error("Data not found");
        }
      } catch (error) {
        setGetData((prev) => ({ ...prev, isLoading: false }));
        setGetData((prev) => ({ ...prev, serverError: error }));
      }
    })();
  }, [dispatch]);
  return [getData, setGetData];
};

export const MoveNextQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.moveNextAction());
  } catch (error) {
    console.log(error);
  }
};
export const MovePrevQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.movePrevAction());
  } catch (error) {
    console.log(error);
  }
};

export const MoveNumberQuestion = (number) => async (dispatch) => {
  try {
    dispatch(Action.moveNumberAction(number));
  } catch (error) {
    console.log(error);
  }
};

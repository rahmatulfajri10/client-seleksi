import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {
  MoveNextQuestion,
  MoveNumberQuestion,
  MovePrevQuestion,
  useFetchQuestion,
} from "../../hooks/FetchQuestion";
import { useNavigate, useParams } from "react-router-dom";
import {
  resetAllAction,
  saveSelectedAnswer,
} from "../../features/questionSlice";
import axios from "axios";
import { config } from "../../configs";

const QuizFrag = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const { kd_soal } = useParams();
  const dispatch = useDispatch();
  const [{ isLoading, apiData, serverErrorr }, setGetData] =
    useFetchQuestion(kd_soal);
  const questions = useSelector(
    (state) => state.questions.queue[state.questions.trace]
  );
  const user = useSelector((state) => state.auth.user);

  const allSoal = useSelector((state) => state.questions.queue);
  const trace = useSelector((state) => state.questions.trace);
  const selectedAnswers = useSelector(
    (state) => state.questions.selectedAnswers
  );

  useEffect(() => {});

  function onNext() {
    if (trace < allSoal.length - 1) {
      dispatch(MoveNextQuestion());
    }
  }
  function onPrev() {
    if (trace > 0) {
      dispatch(MovePrevQuestion());
    }
  }

  function onNumber(number) {
    dispatch(MoveNumberQuestion(number));
  }

  function onOptionSelect(question, option) {
    dispatch(
      saveSelectedAnswer({
        id_user: user.id,
        kd_soal: questions.kd_soal,
        id_question: question,
        id_option_user_response: option,
      })
    );
  }

  async function onFinish() {
    try {
      const response = await axios.post(
        `${config.api_host_dev}/api/v1/cms/answer`,
        selectedAnswers,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      dispatch(resetAllAction());
      navigate("/participant");
    }
  }
  return (
    <>
      <div className="m-10 grid grid-cols-4 gap-4">
        <div className=" border">
          <div className="flex flex-col ">
            <div className="flex justify-center my-5">
              <h2 className="text-xl">{questions && questions.kd_soal}</h2>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {Array.isArray(allSoal) &&
                allSoal.map((question, index) => (
                  <div key={index} className="">
                    <Button onClick={() => onNumber(index + 1)} color="blue">
                      {index + 1}
                    </Button>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="col-span-3 border">
          <div className="flex justify-center tems-center h-full">
            <div className="flex flex-col">
              <h2 className="text-3xl">{questions?.soal}</h2>
              <ul key={questions?.id}>
                {questions?.tbl_options.map((optionObj, i) => (
                  <li key={i}>
                    <input
                      className="mr-2"
                      type="radio"
                      value={optionObj.id}
                      name="option"
                      id={`q${i}-option`}
                      onChange={() =>
                        onOptionSelect(questions.id, optionObj.id)
                      }
                      checked={
                        selectedAnswers.find(
                          (answer) => answer.id_question === questions.id
                        )?.id_option_user_response === optionObj.id
                      }
                    />
                    <label
                      className="text-primary text-2xl"
                      htmlFor={` q${i}-option`}
                    >
                      {optionObj.option}
                    </label>
                  </li>
                ))}
              </ul>
              <div className="flex justify-center space-x-4 m-5">
                <Button onClick={() => onPrev()} color="light">
                  Prev
                </Button>
                <Button color="success" onClick={() => setOpenModal(true)}>
                  Finish
                </Button>
                <Button onClick={onNext} color="light">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Kamu yakin ingin menyelesaikan ujian?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => onFinish()}>
                {"Ya, Selesai"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Tidak, Lanjutkan
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default QuizFrag;

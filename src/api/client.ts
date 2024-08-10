import { Question } from "../types";
import unreliableAxios from "./unreliableAxios";

type GetQuestionsProps = {
  amount: string;
  difficulty: string;
  category: string;
  type?: string;
};

export default class APIClient {
  baseURL: string;

  constructor(params: { baseURL: string }) {
    if (!params.baseURL) throw new Error("NO_API_BASE_URL_FOUND");
    this.baseURL = params.baseURL;
  }

  public async getQuestions({
    amount,
    difficulty,
    category,
    type = "multiple",
  }: GetQuestionsProps) {
    const res = (await unreliableAxios.get(
      this.baseURL +
        `/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`,
    )) as unknown as { data: { results: Question[] } };

    return res.data.results;
  }
}

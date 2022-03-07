import { useMemo } from "react";
import { ObjectSchema, ValidationError } from "yup";

export type customJsonForm = { [key: string]: any };

/**
 * Merge and unified Tailwindcss classes
 * @param func
 */
export const createMemoClass = (func: (props: any) => string) => {
  return function useMemoClass (args?: any) {
    const dependencies = typeof args === "object" && args !== null
      ? Object.keys(args)
        .filter((key) => key !== "theme")
        .map((key) => args[key])
      : [];

    return useMemo(() => func(args), dependencies);
  };
};

/**
 * Simulate a delayed callback. Thanks to https://stackoverflow.com/a/53384583
 * @param delay
 * @param callback
 */
export const delay = async (delay: number = 1000, callback: Function) => {
  const delayPromise = (milliseconds: number | undefined) => new Promise(response => setTimeout(response, milliseconds));
  await delayPromise(delay);

  callback();
};

/**
 * Transform a formData object into a json object
 * @param formData
 */
export const formToJson = (formData: FormData): customJsonForm => {
  const formJSON: { [key: string]: any } = {};

  for (let key of formData.keys()) {
    formJSON[key] = formData.get(key);
  }

  return formJSON;
};

/**
 * Display errors in a standardized format
 * @param errors
 */
export const formErrors = (errors: any): {} => {
  const _errors = errors as ValidationError;
  const validationErrors: { [key: string]: string[] } = {};

  _errors.inner.forEach((e: ValidationError) => {
    if (e.path) {
      validationErrors[e.path] = [];
      validationErrors[e.path].push(e.message);
    }
  });

  return validationErrors;
};

/**
 * Return the json form data or an error
 * @param request
 * @param schema
 */
export const parseFormData = async (request: Request, schema: ObjectSchema<any, any, any, any>): Promise<[form?: customJsonForm, errors?: {}]> => {
  try {
    const form = await schema.validate(
      formToJson(await request.formData()),
      { abortEarly: false },
    );

    return [form, undefined];
  } catch (error) {
    const errors = formErrors(error);

    return [undefined, errors];
  }
};

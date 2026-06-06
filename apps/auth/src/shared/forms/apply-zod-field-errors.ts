import {
  type FieldPath,
  type FieldValues,
  type UseFormReturn,
} from 'react-hook-form';
import { type ZodType } from 'zod';

export function applyZodFieldErrors<TFieldValues extends FieldValues>(
  form: UseFormReturn<TFieldValues>,
  schema: ZodType<TFieldValues>,
  values: TFieldValues,
) {
  form.clearErrors();

  const parsed = schema.safeParse(values);

  if (parsed.success) {
    return parsed.data;
  }

  for (const issue of parsed.error.issues) {
    const fieldName = issue.path[0];

    if (typeof fieldName === 'string') {
      form.setError(fieldName as FieldPath<TFieldValues>, {
        type: 'manual',
        message: issue.message,
      });
    }
  }

  return null;
}

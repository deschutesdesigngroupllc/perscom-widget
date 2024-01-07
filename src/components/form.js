'use client';

import { useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { submitForm } from '../actions/forms';
import { Alert } from './alert';
import { Card } from './card';
import { Field } from './field';
import { Label } from './label';
import { Submit } from './submit';

export function Form({ form, searchParams }) {
  const submitAction = submitForm.bind(null, form.id, searchParams);
  const [formState, formAction] = useFormState(submitAction, {});
  const { pending } = useFormStatus();
  const formRef = useRef();

  if (formState?.finished) {
    formRef.current?.scrollIntoView();
  }

  if (formState?.success) {
    formRef.current?.reset();
  }

  return (
    <Card className="p-6">
      <h5 className="text-xl font-bold">{form.name}</h5>
      <form action={formAction} className="mb-0" ref={formRef}>
        <div className="flex flex-col gap-4 py-4 sm:py-0">
          {formState?.success && (
            <Alert type="success">
              {form.success_message ??
                formState.message ??
                'Your form has been successfully submitted.'}
            </Alert>
          )}
          {formState?.error && (
            <Alert type="failure">
              {formState.message ?? 'There was an error submitting the form.'}
            </Alert>
          )}
          {form?.instructions && <div className="text-sm">{form.instructions}</div>}
          {form?.fields &&
            !!form.fields.length &&
            form.fields.map((field) => {
              return (
                <div key={field.key}>
                  <div className="mb-2 block">
                    <Label htmlFor={field.key} value={field.name} />
                  </div>
                  <Field field={field} />
                </div>
              );
            })}
          <Submit aria-disabled={pending} disabled={pending}>
            {pending ? 'Submitting...' : 'Submit'}
          </Submit>
        </div>
      </form>
    </Card>
  );
}

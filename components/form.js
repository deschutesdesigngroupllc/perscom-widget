'use client';

import { Field } from './field';
import { Card } from './card';
import { Alert } from './alert';
import { submitForm } from '../actions/forms';
import { Submit } from './submit';
import { useFormStatus, useFormState } from 'react-dom';
import { useRef, useState } from 'react';
import { Label } from 'flowbite-react';

export function Form({ form }) {
  const [formValues, setFormValues] = useState({});
  const [formState, formAction] = useFormState(submitForm, {});
  const { pending } = useFormStatus();
  const formRef = useRef();

  const handleSubmit = (event) => {
    formAction(formValues);
  };

  if (formState.success) {
    formRef?.current?.reset();
  }

  return (
    <Card className="p-6">
      <h5 className="text-xl font-bold">{form.name}</h5>
      <form action={handleSubmit} className="mb-0" ref={formRef}>
        <div className="flex flex-col gap-4 py-4 sm:py-0">
          {formState?.success && (
            <Alert
              message={formState.message ?? 'Your form has been successfully submitted.'}
              type="success"
            />
          )}
          {formState?.error && (
            <Alert
              message={formState.message ?? 'There was an error submitting the form.'}
              type="failure"
            />
          )}
          {/*{validationError && <Alert message={validationError} type="failure" />}*/}
          {form?.instructions && <div className="text-sm">{form.instructions}</div>}
          {form?.fields &&
            !!form.fields.length &&
            form.fields.map((field) => {
              return (
                <div key={field.key}>
                  <div className="mb-2 block">
                    <Label htmlFor={field.key} value={field.name} />
                  </div>
                  <Field field={field} formValues={formValues} setFormValues={setFormValues} />
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

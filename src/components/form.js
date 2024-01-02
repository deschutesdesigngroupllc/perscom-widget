'use client';

import { Label } from './label';
import { Field } from './field';
import { Card } from './card';
import { Alert } from './alert';
import { Submit } from './submit';
import { useFormStatus, useFormState } from 'react-dom';
import { useRef, useState } from 'react';
import { submitForm } from '../actions/forms';

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
            <Alert
              message={
                form.success_message ??
                formState.message ??
                'Your form has been successfully submitted.'
              }
              type="success"
            />
          )}
          {formState?.error && (
            <Alert
              message={formState.message ?? 'There was an error submitting the form.'}
              type="failure"
            />
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

import { ReactNode, memo } from "react";
import { FormProvider } from "react-hook-form";

type RHFormType = {
  methods: any;
  onSubmit: (data: any) => void;
  children: ReactNode;
};

function RHForm({ methods, onSubmit, children }: RHFormType) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </FormProvider>
  );
}

export default memo(RHForm);

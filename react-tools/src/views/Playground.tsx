import { Button, Grid, Stack } from "@mui/joy";
import RHFInput from "components/forms/RHFInput";
import RHFSubmit from "components/forms/RHFSubmit";
import RHForm from "components/forms/RHForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Check, PermIdentity } from "@mui/icons-material";
import RHFSelect from "components/forms/RHFSelect";
import RHFDate from "components/forms/RHFDate";
import dayjs from "dayjs";
import RHFBtnGroup from "components/forms/RHFBtnGroup";
import RHFSelectGroup from "components/forms/RHFSelectGroup";
import RHFTextArea from "components/forms/RHFTextArea";
import RHFDrop from "components/forms/RHFDrop";
import RHFRadio from "components/forms/RHFRadio";
import useLoading from "app/hooks/useLoading";

const PlaygroundSchema = Yup.object().shape({
  userId: Yup.string()
    .typeError("아이디를 입력하세요")
    .min(5, "최소 5글자 이상 입력")
    .max(10, "최대 10글자 미만 입력")
    .required("필수 입력 항목"),
  userPwd: Yup.string()
    .typeError("비밀번호를 입력하세요")
    .min(5, "최소 5글자 이상 입력")
    .max(7, "최대 7글자 이하 입력")
    .required("필수 입력 항목"),
  drop: Yup.number().typeError("필수 선택 항목").required("필수 선택 항목"),
  startDate: Yup.string()
    .typeError("날짜 타입으로 입력해주세요")

    .required("필수 입력 항목"),
  endDate: Yup.string()
    .typeError("날짜 타입으로 입력해주세요")

    .required("필수 입력 항목"),
  start: Yup.string()
    .typeError("날짜 형식으로 입력해주세요")
    .when("end", (endDate, schema) => {
      return schema.test({
        test: (startDate) => {
          const startValue = dayjs(startDate).valueOf();
          const endValue = dayjs(endDate[0]).valueOf();

          return startValue <= endValue;
        },
        message: "종료 일자 보세요",
      });
    })
    .required("필수 입력 항목"),
  end: Yup.string()
    .typeError("날짜 형식으로 입력해주세요")
    .required("필수 입력 항목"),
  group: Yup.number().typeError("필수 선택 항목").required("필수 선택 항목"),
  groupMulti: Yup.number()
    .typeError("필수 선택 항목")
    .required("필수 선택 항목"),
  textarea: Yup.string()
    .typeError("내용을 입력하세요")
    .min(5, "최소 5글자 이상 입력")
    .max(10, "최대 10글자 미만 입력")
    .required("필수 입력 항목"),

  radio: Yup.number().required("필수 입력 항목"),
});

function Playground() {
  const { setLoading } = useLoading();
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(PlaygroundSchema),
    defaultValues: {},
  });
  const { handleSubmit } = methods;
  const handlers = {
    onSubmit: (data: any) => {
      console.log(data);
    },
    handleLoading: (): void => {
      setLoading();
    },
  };

  return (
    <Stack>
      <RHForm methods={methods} onSubmit={handleSubmit(handlers.onSubmit)}>
        <Grid container spacing={2}>
          <Grid xs={6} md={4}>
            <RHFInput
              startDecorator={<PermIdentity fontSize="small" />}
              name="userId"
              endPoint
            />
          </Grid>
          <Grid xs={6} md={4}>
            <RHFInput
              startDecorator={<PermIdentity fontSize="small" />}
              name="userPwd"
              endPoint
            />
          </Grid>
          <Grid xs={6} md={4}>
            <RHFSelect
              name="drop"
              options={[
                { label: "개발팀", value: 1 },
                { label: "운영팀", value: 2 },
              ]}
              endPoint
            />
          </Grid>
          <Grid xs={6} md={4}>
            <RHFDate name="start" endPoint />
          </Grid>
          <Grid xs={6} md={4}>
            <RHFDate name="end" endPoint />
          </Grid>
          <Grid xs={6} md={4}>
            <RHFBtnGroup
              name="group"
              options={[
                { label: "옵션1", value: 1 },
                { label: "옵션2", value: 2 },
                { label: "옵션3", value: 3 },
              ]}
              endPoint
            />
          </Grid>
          <Grid xs={6} md={4}>
            <RHFSelectGroup
              name="groupMulti"
              options={[
                { label: "일별", value: 1 },
                { label: "주별", value: 2 },
                { label: "월별", value: 3 },
              ]}
              endPoint
            />
          </Grid>
          <Grid xs={6} md={4}>
            <RHFDrop
              name="drop"
              options={[
                { label: "10", value: 10 },
                { label: "20", value: 20 },
                { label: "30", value: 30 },
              ]}
              endPoint
            />
          </Grid>
          <Grid xs={6} md={4}>
            <RHFTextArea name="textarea" endPoint />
          </Grid>
          <Grid xs={6} md={4}>
            <RHFRadio
              name="radio"
              options={[
                { label: "label1", value: 1 },
                { label: "label2", value: 2 },
                { label: "label3", value: 3 },
              ]}
              endPoint
            />
          </Grid>
        </Grid>

        <Button onClick={handlers.handleLoading}>loading bar</Button>

        <RHFSubmit label="유효성검증" endIcon={<Check />} />
      </RHForm>
    </Stack>
  );
}

export default Playground;

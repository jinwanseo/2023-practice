#FROM --platform=linux/amd64 python:3.12
FROM python:3.12
WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

ENV DB_HOST=localhost
ENV DB_PORT=5432
ENV DB_NAME=rbrain
ENV DB_USER=postgres
ENV DB_PASS=12345

ENV MQ_HOST=dingo.rmq.cloudamqp.com
ENV MQ_PORT=5672
ENV MQ_USER=rgqpxtwv
ENV MQ_PASS=6clr96bgEgQkw5N_siqS2jSJs88W0aYX

EXPOSE 8000

CMD ["uvicorn", "main:app", "--reload"]
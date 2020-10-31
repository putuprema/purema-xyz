import { Typography } from "@material-ui/core";
import Alert from "components/Alert";
import { Button } from "components/Button";
import Container from "components/container/Container";
import Section from "components/section/Section";
import TextField from "components/text-field/TextField";
import { ApiResponse } from "models/ApiResponse";
import { FormEvent, useState } from "react";
import styles from "./ContactMe.module.scss";
import HttpStatus from "http-status-codes";

const ContactMe: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse<any> | undefined>(undefined);

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    setLoading(true);

    // TODO: connect to backend for contact form submission
  };

  return (
    <Section fullScreen centered backgroundColor="white">
      <div className={`${styles["main"]}`}>
        <Container className={`${styles["inner"]}`}>
          <Typography variant="h1" align="center">
            Contact Me
          </Typography>
          {response && (
            <Alert severity={response.code === HttpStatus.OK ? "success" : "error"} onClose={() => setResponse(undefined)}>
              {response.message}
            </Alert>
          )}
          <form onSubmit={onSubmit}>
            <TextField fullWidth required placeholder="Name" />
            <TextField fullWidth required type="email" placeholder="Email" />
            <TextField variant="textarea" fullWidth required placeholder="Type your message..." rows={8} />
            <Button loading={loading} fullWidth style={{ backgroundColor: "white", marginTop: "1rem" }} color="default" type="submit">
              Submit
            </Button>
          </form>
        </Container>
      </div>
    </Section>
  );
};

export default ContactMe;

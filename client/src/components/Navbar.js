import {
  Anchor,
  Button,
  Header,
  Menu,
  Nav,
  Box,
  Form,
  TextInput,
  DropButton,
  Text,
} from "grommet";
import React from "react";
import { useSelector } from "react-redux";
import { AddCircle, DocumentUser, Github, Search } from "grommet-icons";
import { Link, useHistory } from "react-router-dom";
import { Avatar, ImageStamp } from "grommet-controls";

import { logOut } from "../store/users";

export default () => {
  const { auth } = useSelector((state) => state);
  const history = useHistory();

  return (
    <Header
      height="xxsmall"
      background="brand"
      style={{ position: "sticky", top: "0" }}
    >
      <Nav margin="small" direction="row">
        <Link
          to="/"
          style={{
            alignSelf: "center",
            textDecoration: "none",
            color: "#fff8e1",
            fontWeight: "700",
            fontFamily: "Poppins, sans-serif",
            fontSize: "24px",
          }}
        >
          Fork
        </Link>

        <DropButton
          label={<Text color="background">About</Text>}
          dropAlign={{ top: "bottom", right: "right" }}
          primary
          dropContent={
            <Box pad="medium">
              <Avatar
                image="https://avatars1.githubusercontent.com/u/62520351?s=460&u=55b9329cab60bcd8ed323f29212e021176a206c1&v=4"
                title="Ben Anderson"
                subTitle="Software Devloper"
              />
              <Button
                icon={<Github />}
                label="Github"
                href="https://github.com/andersjbe/Fork"
                target="_blank"
                margin="xsmall"
              />
              <Button
                icon={<DocumentUser />}
                label="Portfolio"
                href="https://andersjbe.github.io"
                target="_blank"
                margin="xsmall"
              />
            </Box>
          }
        />
      </Nav>

      <Box background="#fff" round="large">
        <Form
          onSubmit={({ value }) =>
            history.push(`/browse?search=${value["search"]}`)
          }
        >
          <TextInput name="search" plain size="small" icon={<Search />} />
        </Form>
      </Box>

      <Nav margin="small" direction="row">
        <Link to="/create-recipe" style={{ alignSelf: "center" }}>
          <Button primary label="New" icon={<AddCircle color="background" />} />
        </Link>
        <Menu
          label={
            <Box>
              <ImageStamp
                round="full"
                size="small"
                src={auth.image_url}
                plain
              />
            </Box>
          }
          icon={false}
          items={[
            { label: "Account", href: "/user" },
            { label: "Log Out", onClick: logOut },
          ]}
          dropAlign={{
            top: "top",
            right: "right",
          }}
        />
      </Nav>
    </Header>
  );
};

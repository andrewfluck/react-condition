import React from "react";
import TestRenderer from "react-test-renderer";
import { If, ElseIf, Else, Switch, Case, Default } from "./react-condition.js";

function expectRenderToEqual(actual, expected) {
  expect(TestRenderer.create(actual).toJSON()).toEqual(
    TestRenderer.create(expected).toJSON()
  );
}

function expectRenderToThrow(actual, error) {
  const consoleError = console.error;
  try {
    console.error = () => {};
    expect(() => TestRenderer.create(actual)).toThrow(error);
  } finally {
    console.error = consoleError;
  }
}

describe("react-condition", () => {
  describe("if", () => {
    it("includes children if condition is truthy", () => {
      expectRenderToEqual(<If test={"truthy"}>Truthy?</If>, "Truthy?");
    });

    it("excludes children if condition is falsey", () => {
      expectRenderToEqual(<If test={0}>Truthy?</If>, null);
    });

    it("includes Else child if condition is falsey", () => {
      expectRenderToEqual(
        <If test={0}>
          Truthy?
          <Else>Falsey?</Else>
        </If>,
        "Falsey?"
      );
    });

    it("excludes Else child if condition is truthy", () => {
      expectRenderToEqual(
        <If test={1}>
          Truthy?
          <Else>Falsey?</Else>
        </If>,
        "Truthy?"
      );
    });

    it("evaluates ElseIf child if condition is falsey", () => {
      expectRenderToEqual(
        <If test={0}>
          Truthy?
          <ElseIf test={1}>Otherwise?</ElseIf>
        </If>,
        "Otherwise?"
      );
    });

    it("does not evaluate If child if condition is falsey", () => {
      expectRenderToEqual(
        <If test={0}>
          Truthy?
          <If test={1}>Otherwise?</If>
        </If>,
        null
      );
    });

    it("allows multiple nested ElseIf and Else cases", () => {
      expectRenderToEqual(
        <If test={0}>
          Truthy?
          <ElseIf test={0}>
            Otherwise?
            <Else>Not Otherwise?</Else>
          </ElseIf>
          <Else>Falsey?</Else>
        </If>,
        <>
          {"Not Otherwise?"}
          {"Falsey?"}
        </>
      );
    });

    it("supports then prop", () => {
      expectRenderToEqual(<If test={1} then={"Truthy?"} />, "Truthy?");
      expectRenderToEqual(<If test={0} then={"Truthy?"} />, null);
    });

    it("supports then else prop", () => {
      expectRenderToEqual(
        <If test={1} then={"Truthy?"} else={"Falsey?"} />,
        "Truthy?"
      );
      expectRenderToEqual(
        <If test={0} then={"Truthy?"} else={"Falsey?"} />,
        "Falsey?"
      );
    });

    it("supports legacy case prop", () => {
      expectRenderToEqual(<If case={1} then={"Truthy?"} />, "Truthy?");
      expectRenderToEqual(<If case={0} then={"Truthy?"} />, null);
    });

    describe("error cases", () => {
      it("requires case", () => {
        expectRenderToThrow(<If then={null} />, "<If> requires a `test` prop.");
      });

      it("requires either then or children", () => {
        expectRenderToThrow(
          <If test={1} />,
          "<If> expects either a `then` prop or children."
        );
      });

      it("requires then when using else", () => {
        expectRenderToThrow(
          <If test={1} else={null} />,
          "<If> only use `else` prop alongside `then` prop."
        );
      });
    });
  });

  describe("switch", () => {
    it("includes child from matching expression", () => {
      expectRenderToEqual(
        <Switch expression="blue">
          <Case value="red" then={"red"} />
          <Case value="green" then={"green"} />
          <Case value="blue" then={"blue"} />
        </Switch>,
        "blue"
      );
    });

    it("includes single child from matching expression", () => {
      expectRenderToEqual(
        <Switch expression="blue">
          <Case value="red" then={"red"} />
          <Case value="green" then={"green"} />
          <Case value="blue" then={"blue"} />
          <Case value="blue" then={"blue?"} />
        </Switch>,
        "blue"
      );
    });

    it("excludes all children from not matching expression", () => {
      expectRenderToEqual(
        <Switch expression="hot fucking pink">
          <Case value="red" then={"red"} />
          <Case value="green" then={"green"} />
          <Case value="blue" then={"blue"} />
        </Switch>,
        null
      );
    });

    it("includes child from matching expression but fallsback", () => {
      expectRenderToEqual(
        <Switch expression="hot fucking pink">
          <Case value="red" then={"red"} />
          <Case value="green" then={"green"} />
          <Case value="blue" then={"blue"} />
          <Default then={"no color"} />
        </Switch>,
        "no color"
      );
    });

    describe("error cases", () => {
      it("requires default at end", () => {
        expectRenderToThrow(
          <Switch expression="hot fucking pink">
            <Case value="red" then={"red"} />
            <Case value="green" then={"green"} />
            <Default then={"no color"} />
            <Case value="blue" then={"blue"} />
          </Switch>,
          "<Default> is required to be the last node if present."
        );
      });

      it("requires case default or null", () => {
        expectRenderToThrow(
          <Switch expression="red">
            <p>Uh oh 🙊🙉</p>
            <Case value="red" then={"red"} />
            <Case value="green" then={"green"} />
            <Case value="blue" then={"blue"} />
          </Switch>,
          "<Switch> requires a child of type <Case>, <Default>, or null."
        );
      });
    });
  });
});

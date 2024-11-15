/* eslint-disable react/static-property-placement */
/**
 * @class FullpageNavigation
 */
// eslint-disable-next-line react/react-in-jsx-scope
import React, { PureComponent, forwardRef } from "react";
import PropTypes from "prop-types";
import FullpageContext from "./FullpageContext";

// TODO: do navigation
// eslint-disable-next-line react/prefer-stateless-function
class FullpageNavigation extends PureComponent {
  static contextType = FullpageContext;

  static defaultProps = {
    style: {},
    itemStyle: {},
    reverse: false,
    callback: () => {},
  };

  static propTypes = {
    style: PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool])
    ),
    itemStyle: PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool])
    ),
    reverse: PropTypes.bool,
    callback: PropTypes.func,
  };

  gotoSlide = (slide) => {
    const { goto } = this.context;
    const { callback } = this.props;
    if (typeof goto === "function") {
      goto(slide);
      callback();
    } else {
      console.warn("goto function is not available in FullpageContext");
    }
  };

  render() {
    const { style, itemStyle, reverse = false } = this.props;
    const { number, slides, transitionTiming } = this.context;

    return (
      <div
        style={{
          position: "fixed",
          height: "100vh",
          zIndex: 100,
          top: 0,
          right: 0,
          listStyleType: "none",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          justifyContent: "center",
          paddingRight: "1em",
          ...style,
        }}
      >
        {slides.map((slide, i) => (
          <div key={i.toString()}>
            <div
              style={{
                borderRadius: "50%",
                height: number === i ? 14 : 10,
                width: number === i ? 14 : 10,
                margin: number === i ? 3 : 5,
                backgroundColor: reverse ? "white" : "black",
                opacity: number === i ? 1 : 0.5,
                transition: `all ${transitionTiming * 0.5}ms ease-in-out`,
                ...itemStyle,
              }}
              onClick={() => this.gotoSlide(slide)}
              onKeyPress={() => this.gotoSlide(slide)}
              role="button"
              tabIndex="-1"
              aria-label={`Slide ${i}`}
            >
              <span
                style={{
                  display: "none",
                }}
              >
                {`slide number ${i}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default forwardRef((props, ref) => (
  <FullpageNavigation {...props} ref={ref} />
));

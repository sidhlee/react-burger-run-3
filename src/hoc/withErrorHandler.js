import React, { Component } from "react";
import Modal from "../components/UI/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null
      };
      // setting request middlewares
      this.reqInterceptor = axios.interceptors.request.use(
        req => {
          this.setState({ error: null });
          return req;
        }
      );
      // setting response middlewares
      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        err => {
          console.log(JSON.stringify(err, null, 4));
          return this.setState({ error: err });
        }
      );
    }

    componentWillUnmount() {
      /*   console.log(
        "[withErrorHandler] componentWillUnmount",
        this.reqInterceptor, // request interceptor index. will log 0.
        this.resInterceptor // response interceptor index. will log 0.
      ); */
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(
        this.resInterceptor
      );
    }

    closeErrorModal = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <>
          <Modal
            show={this.state.error}
            closeModal={this.closeErrorModal}
          >
            {this.state.error && this.state.error.message}
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
};

export default withErrorHandler;

import React from "react";
import dateFormat from "dateformat";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from "react-animation-components";
const RenderDishes = (dish) => {
  return (
    <FadeTransform
      in
      transformProps={{
        exitTransform: "scale(0.5) translateY(-50%)",
      }}
    >
      <Card>
        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </FadeTransform>
  );
};
const RenderComments = ({ comments }) =>
  comments.map((comment) => {
    return (
      <Fade in>
        <div>
          <p>
            -- <span>{comment.author}</span>{" "}
            {dateFormat(comment.date, "mmmm dS, yyyy")}
          </p>
          <p>{comment.comment}</p>
        </div>
      </Fade>
    );
  });
const DishDetails = (props) => {
  const { comments, postComment } = props;
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null) {
    return (
      <div class="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-5 m-1">{RenderDishes(props.dish)}</div>
          <div class="col-12 col-md-5">
            <Stagger in>
              <h4>Comments</h4>
              {<RenderComments comments={comments} />}
              <br />
            </Stagger>
            <CommentForm dishId={props.dish.id} postComment={postComment} />
          </div>
        </div>
      </div>
    );
  }
};
export default DishDetails;

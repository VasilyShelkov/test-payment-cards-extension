import * as React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Clipboard from "react-clipboard.js";

import ContentCopy from "@material-ui/icons/FileCopy";
import Done from "@material-ui/icons/Done";
import StarBorder from "@material-ui/icons/StarBorder";
import Star from "@material-ui/icons/Star";
import Delete from "@material-ui/icons/Delete";
import Zoom from "@material-ui/core/Zoom";

import { Card } from "../../CardModel";
import "./CardToCopy.css";

const formatCardNumber = (cardNumber: string) =>
  cardNumber.replace(/(\d{4})/g, "$1 ").replace(/(^\s+|\s+$)/, "");

interface Props {
  cardNum: string;
  description: string;
  paymentService?: string;
  addToFavourites?: (newFavouriteCard: Card) => void;
  removeFromFavourites?: (cardNumToRemove: string) => any;
  addCopiedCardToRecents?: (copiedCard: Card) => any;
  isFavourite: boolean;
  favouritedIcon?: "star" | "delete";
}
interface State {
  copied: boolean;
  isHovering: boolean;
}
class CardToCopy extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      copied: false,
      isHovering: false
    };
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.copied) {
      setTimeout(() => this.setState({ copied: false }), 3000);
    }
  }

  toggleShowClipboardIcon = (newState: boolean) => {
    this.setState({
      isHovering: newState
    });
  };

  render() {
    const {
      paymentService,
      addToFavourites,
      removeFromFavourites,
      addCopiedCardToRecents,
      isFavourite,
      favouritedIcon = "star",
      ...cardDetails
    } = this.props;
    const { copied, isHovering } = this.state;
    return (
      <ListItem
        button={true}
        onMouseEnter={() => this.setState({ isHovering: true })}
        onMouseLeave={() => this.setState({ isHovering: false })}
      >
        <Clipboard
          component="div"
          className="CardToCopy__clipboard"
          data-clipboard-text={cardDetails.cardNum}
          onSuccess={() => {
            // tslint:disable-next-line:no-unused-expression
            addCopiedCardToRecents && addCopiedCardToRecents(cardDetails);
            this.setState({
              copied: true
            });
          }}
        >
          <div className="CardToCopy__left-icon">
            {paymentService === "stripe" && (
              <Zoom in={!isHovering && !copied}>
                <img
                  className="CardToCopy__payment-service-logo"
                  src="payment-service-logos/stripe-logo.svg"
                  width="75"
                  alt="stripe"
                />
              </Zoom>
            )}
            <Zoom in={isHovering || copied}>
              <ListItemIcon className="CardToCopy__copy-card-icon">
                {copied ? <Done style={{ color: "green" }} /> : <ContentCopy />}
              </ListItemIcon>
            </Zoom>
          </div>
          <ListItemText
            primary={copied ? "Copied" : formatCardNumber(cardDetails.cardNum)}
            secondary={cardDetails.description}
          />
        </Clipboard>

        {addToFavourites && !isFavourite && (
          <ListItemSecondaryAction>
            <IconButton
              aria-label="Favourite"
              onClick={event => {
                addToFavourites(cardDetails);
              }}
            >
              <StarBorder />
            </IconButton>
          </ListItemSecondaryAction>
        )}

        {removeFromFavourites && isFavourite && (
          <ListItemSecondaryAction>
            <IconButton
              aria-label="Favourite"
              color="secondary"
              onClick={event => {
                removeFromFavourites(cardDetails.cardNum);
              }}
            >
              {favouritedIcon === "delete" ? <Delete /> : <Star />}
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    );
  }
}

export default CardToCopy;

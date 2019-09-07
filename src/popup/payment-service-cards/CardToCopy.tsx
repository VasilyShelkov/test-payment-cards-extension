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

import * as favouritesActions from "../../store/favouritesActions";
import "./CardToCopy.css";

const formatCardNumber = (cardNumber: string) =>
  cardNumber.replace(/(\d{4})/g, "$1 ").replace(/(^\s+|\s+$)/, "");

interface Props {
  cardNum: string;
  description: string;
  paymentService?: string;
  addToFavourites?: typeof favouritesActions.addFavourite;
  removeFromFavourites?: typeof favouritesActions.removeFavourite;
  addCopiedCardToRecents?: typeof favouritesActions.addRecentlyCopied;
  isFavourite: boolean;
  favouritedIcon?: "star" | "delete";
  service: "stripe";
}

const CardToCopy = ({
  paymentService,
  addToFavourites,
  removeFromFavourites,
  addCopiedCardToRecents,
  isFavourite,
  favouritedIcon = "star",
  service,
  ...cardDetails
}: Props) => {
  const [copied, setCopied] = React.useState(false);
  const [isHovering, setHovering] = React.useState(false);

  React.useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 3000);
    }
  });

  return (
    <ListItem
      button={true}
      dense={true}
      disableGutters={true}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Clipboard
        component="div"
        className="CardToCopy__clipboard"
        data-clipboard-text={cardDetails.cardNum}
        onSuccess={() => {
          // tslint:disable-next-line:no-unused-expression
          addCopiedCardToRecents &&
            addCopiedCardToRecents(cardDetails, service);
          setCopied(true);
        }}
      >
        <ListItemIcon className="CardToCopy__left-icon">
          <>
            {paymentService === "stripe" && (
              <Zoom in={!isHovering && !copied}>
                <img
                  src="payment-service-logos/stripe-logo.svg"
                  width="55"
                  alt="stripe"
                />
              </Zoom>
            )}
            <Zoom in={isHovering || copied}>
              {copied ? (
                <Done className="CardToCopy__copy-success-icon" />
              ) : (
                <ContentCopy className="CardToCopy__copy-card-icon" />
              )}
            </Zoom>
          </>
        </ListItemIcon>

        <ListItemText
          primary={copied ? "Copied" : formatCardNumber(cardDetails.cardNum)}
          secondary={cardDetails.description}
        />
      </Clipboard>

      {addToFavourites && !isFavourite && (
        <ListItemSecondaryAction>
          <IconButton
            aria-label="Favourite"
            onClick={() => {
              addToFavourites(cardDetails, service);
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
              removeFromFavourites(cardDetails.cardNum, service);
            }}
          >
            {favouritedIcon === "delete" ? <Delete /> : <Star />}
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

export default CardToCopy;

const { buildings } = require("../modules/rooms");
const { APP_HOME_ROOM_BUTTONS } = require("../modules/constants");
const generatedFloorMaps = require('../build/generated-floor-maps');

/**
 * Get the row of room buttons, and select the active button.
 * @param {Object} buildings 
 * @param {Object} selectedBuilding 
 * @returns {Object}
 */
const getRoomButtons = (buildings, selectedBuilding) => {
  return {
    type: "actions",
    block_id: APP_HOME_ROOM_BUTTONS,
    elements: Object.keys(buildings).map(buildingKey => {
      const buildingObj = buildings[buildingKey];
      const { icon, address } = buildingObj;

      const obj = {
        type: "button",
        text: {
          type: "plain_text",
          text: `${icon} ${address}`,
          emoji: true
        },
        value: buildingKey
      };

      if (buildingObj.address === selectedBuilding.address) {
        obj.style = "primary";
      }

      return obj;
    })
  };
};

/**
 * Build the Home Tab content.
 *
 * @param {Object} buildingObj
 * @returns {Object}
 */
const homeBuilder = (buildingObj = buildings.STAUFFACHERQUAI_8) => {
  const { icon, address, code, imgUrl, nickname } = buildingObj;

  return {
    type: "home",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "Click on one of the buttons below to see the room directory for each building."
        }
      },
      { ...getRoomButtons(buildings, buildingObj) },
      {
        type: "divider"
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `>${icon} *${address}*\n>${nickname}\n>_${code}_`
        }
      },
      {
        type: "image",
        title: {
          type: "plain_text",
          text: `${address} \"${nickname}\" is marked in green.`,
          emoji: true
        },
        image_url: `${imgUrl}`,
        alt_text: `${address}`
      },
      {
        type: "divider"
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: generatedFloorMaps[buildingObj.value]
        }
      },
      {
        type: "divider"
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text:
              "\nMade with ❤️ by Michael Wuergler so he can stop getting lost."
          }
        ]
      }
    ]
  };
};

module.exports = homeBuilder;

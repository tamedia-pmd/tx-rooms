const { locate } = require("../../api/locate");

const getRealBodyWithText = text => `"token=fZf6rkRHrkL9EpC3eUDUBi7Q&team_id=T8N20GRJT&team_domain=radiovisual&channel_id=DUJR38729&channel_name=directmessage&user_id=U8MRG1HUN&user_name=wuergler&command=%2Froom&text=${text}&response_url=https%3A%2F%2Fhooks.slack.com%2Fcommands%2FT8N20GRJT%2F970853870197%2FyCriSk4EAdH9H0pTP0DrnVHD&trigger_id=970381596788.294068569639.e645670ddd8d9cd7bd13b00aa991e36f"`;

describe("api.locate", () => {
  test("should find valid rooms", async () => {
    const event = {
      body: getRealBodyWithText('paris')
    };

    const expected = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        response_type: "ephemeral",
        text: "paris Floor: 4 Building: Glass"
      })
    };

    const actual = await locate(event);

    expect(actual).toMatchObject(expected);
  });
  
  test("should report invalid rooms", async () => {
    const event = {
      body: getRealBodyWithText('noopRoom')
    };

    const expected = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        response_type: "ephemeral",
        text: "The meeting room noopRoom is not recognized"
      })
    };

    const actual = await locate(event);

    expect(actual).toMatchObject(expected);
  });
  
  test("should report invalid rooms with empty data", async () => {
    const event = {
      body: ''
    };

    const expected = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        response_type: "ephemeral",
        text: "The meeting room  is not recognized"
      })
    };

    const actual = await locate(event);

    expect(actual).toMatchObject(expected);
  });
});

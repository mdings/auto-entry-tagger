import React from "react";
import { Paragraph } from "@contentful/f36-components";
import { useSDK } from "@contentful/react-apps-toolkit";

const Sidebar = () => {
  const sdk = useSDK();
  const [teams, setTeams] = React.useState([]);

  React.useEffect(() => {
    // Auto-resize the iframe to fit the content
    sdk.window.startAutoResizer();

    // Clean up when component unmounts
    return () => {
      sdk.window.stopAutoResizer();
    };
  }, [sdk.window]);

  React.useEffect(() => {
    const fetchTeams = async () => {
      const teams = await sdk.cma.team.getManyForSpace({
        spaceId: "b2s5kn244bzl",
        query: {
          limit: 10,
        },
      });
      setTeams(teams.items);
    };
    fetchTeams();
  }, []);

  console.log(sdk.user);

  return (
    <>
      <Paragraph>
        If this app is enabled in the sidebar, it can register events that can
        work with the information coming from our CMA. This will allow you to
        automatically tag content based on a team membership of that user. In
        this case, if a user creates an entry, he will automatically create a
        tag with the team name he belongs to. Just look at the code to see how
        to retrieve that information.
      </Paragraph>
      <Paragraph>
        There are currently {teams.length} teams in this space:{" "}
        {teams.map((team) => team.name).join(", ")}
      </Paragraph>
      <Paragraph>
        This user is part of team:
        {teams
          .filter((team) =>
            sdk.user.teamMemberships.some(
              (membership) => membership.sys.team.sys.id === team.sys.id
            )
          )
          .map((team) => team.name)
          .join(", ") || "No teams"}
      </Paragraph>
    </>
  );
};

export default Sidebar;

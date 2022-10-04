import { generateHydraS1Attester } from "@attestations-collections/base/hydra-s1";
import { Network } from "topics/attester";
import { BadgesCollection } from "topics/badge";

export const hydraS1SimpleAttester = generateHydraS1Attester(
  {
    [Network.Polygon]: {
      attesterAddress: "0x10b27d9efa4A1B65412188b6f4F29e64Cf5e0146",
      rootsRegistryAddress: "0xEce747769BD44A7854c8C0913A91Aa801e42D0d0",
    },
  },

  {
    name: "hydra-s1-simple",
    networks: [Network.Polygon],
    attestationsCollections: [
      // Sismo friends
      {
        internalCollectionId: 0,
        groupFetcher: async () => [], // await groupStore.latest("sismo-diggers"),
      },
      {
        internalCollectionId: 1,
        groupFetcher: async () => [], // await groupStore.latest("sismo-citizens"),
      },
      {
        internalCollectionId: 2,
        groupFetcher: async () => [], // [await this.groupStore.latest("sismo-guests")]
      },
      // Masquerade
      {
        internalCollectionId: 3,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("sismo-masquerade-lens-followers"),
        ],
      },
      // Ethereum-power-users
      {
        internalCollectionId: 4,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("ethereum-power-users"),
        ],
      },
      // proof-of-humanity
      {
        internalCollectionId: 8,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("proof-of-humanity"),
        ],
      },
      // Gitcoin Round 15 donors
      {
        internalCollectionId: 25,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("gitcoin-grants-round-15-donors"),
        ],
      },
      // Proof of Attendance (POAP)
      {
        internalCollectionId: 29,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("proof-of-attendance-main-events"), 
        ],
      },
      // sismo Contributors
      {
        internalCollectionId: 5151110,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("sismo-contributors"),
        ],
      },
    ],
  }
);

export const hydraS1SimpleBadges: BadgesCollection = {
  collectionIdFirsts: {
    [Network.Polygon]: 10000001,
  },
  badges: [
    {
      internalCollectionId: 0,
      name: "ZK Badge: Sismo Digger",
      description: "ZK Badge received by early contributors of Sismo",
      image: "sismo_digger.svg",
      groupGeneratorName: "sismo-diggers",
      publicContacts: [{
        type: "twitter",
        contact: "@sismo_eth"
      }],
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: []
    },
    {
      internalCollectionId: 1,
      name: "ZK Badge: Sismo Citizen",
      description: "ZK Badge received by early supporters of Sismo",
      image: "sismo_citizen.svg",
      groupGeneratorName: "sismo-citizens",
      publicContacts: [{
        type: "twitter",
        contact: "@sismo_eth"
      }],
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: []
    },
    {
      internalCollectionId: 2,
      name: "ZK Badge: Sismo Guest",
      description: "ZK Badge received by community members of frens of Sismo",
      image: "sismo_guest.svg",
      groupGeneratorName: "sismo-guests",
      publicContacts: [{
        type: "twitter",
        contact: "@sismo_eth"
      }],
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: []
    },
    {
      internalCollectionId: 3,
      name: "Sismo Masquerade Bloomer ZK Badge",
      description:
        "ZK Badge owned by @sismo.lens and @masquerade.lens Lens followers",
      image: "sismo_masquerade_bloomers.svg",
      groupGeneratorName: "sismo-masquerade-lens-followers",
      publicContacts: [{
        type: "twitter",
        contact: "@sismo_eth"
      }],
      eligibility: {
        shortDescription: "Follow @sismo.lens and @masquerade.lens before July 6 2022",
        specification: "",
      },
      links: []
    },
    {
      internalCollectionId: 4,
      name: "Ethereum Power User ZK Badge",
      description: "ZK Badge owned by the most active users on Ethereum",
      image: "ethereum_power_users.svg",
      groupGeneratorName: "ethereum-power-users",
      publicContacts: [{
        type: "twitter",
        contact: "@sismo_eth"
      }],
      eligibility: {
        shortDescription: "Be part of the top 0.1% most active users on Ethereum",
        specification: "",
      },
      links: []
    },
    {
      internalCollectionId: 8,
      name: "Proof of Humanity ZK Badge",
      description: "ZK Badge owned by verified humans on POH",
      image: "proof_of_humanity.svg",
      groupGeneratorName: "proof-of-humanity",
      publicContacts: [{
        type: "twitter",
        contact: "@sismo_eth"
      }],
      eligibility: {
        shortDescription: "Prove you are a human with PoH",
        specification: "",
      },
      links: [
        {
          logoUrl: "",
          label: "PoH",
          url: "https://www.proofofhumanity.id/"
        }
      ]
    },
    {
      internalCollectionId: 25,
      name: "GR15 Gitcoin Contributor ZK Badge",
      description: "ZK Badge owned by contributors of the 15th round of Gitcoin Grants",
      image: "gitcoin_grants_round_15_donors.svg",
      groupGeneratorName: "gitcoin-grants-rounds-donors",
      publicContacts: [{
        type: "twitter",
        contact: "@sismo_eth"
      }],
      eligibility: {
        shortDescription: "You must have donated in the 15th round of Gitcoin Grants",
        specification: "",
      },
      links: [
        {
          logoUrl: "",
          label: "GR15",
          url: "https://gitcoin.co/grants/explorer"
        }
      ]
    },
    {
      internalCollectionId: 29,
      name: "Proof of Attendance ZK Badge",
      description: "ZK Badge owned by Ethereum events attendees. This Badge proves their IRL attendance to at least one Ethereum event.",
      image: "proof-of-attendance-main-events.svg", 
      groupGeneratorName: "proof-of-attendance-main-events",
      publicContacts: [{
        type: "twitter",
        contact: "@sismo_eth"
      },
    ],
      eligibility: {
        shortDescription: "Hold one of the POAPs from a curated list of events",
        specification: "Attend EthCC4, and/or EthCC5, and/or DevCon 5, and/or DevConnect Co-work space, and/or ETHNew York, and/or ETHBerlin 3, and/or Poap Sponsor boot @DappCon22 and/or met Patricio during events on December 2021 and/or on February 2022, and/or on March 2022, and/or on April 2022, and/or on May 2022, and/or on June 2022, and/or on July 2022, and/or on August 2022, and/or on September 2022",
      },
      links: [
        {
          logoUrl: "",
          label: "POAP",
          url: "https://poap.gallery/"
        }
      ]
    }, 
    {
      internalCollectionId: 5151110,
      name: "Sismo Contributor ZK Badge",
      description: "ZK Badge owned by Sismo contributors. This Badge is used in Sismo Governance for contributors to voice their opinions.",
      image: "sismo_contributors.svg",
      groupGeneratorName: "sismo-contributors",
      publicContacts: [{
        type: "twitter",
        contact: "@sismo_eth"
      }],
      eligibility: {
        shortDescription: "Prove that you are involved in Sismo by holding .sismo.eth ENS, a contribution POAP, or early ZK Badges.",
        specification: "",
      },
      links: []
    },
  ],
};

export const frontBadges: BadgesCollection = {
  collectionIdFirsts: {
    [Network.Polygon]: 0,
  },
  badges: [
    {
      internalCollectionId: 0,
      name: "Sismo Early User ZK Badge",
      description: "ZK Badge owned by Sismo Early users",
      image: "sismo_early_users.svg",
      groupGeneratorName: "sismo-early-users",
      publicContacts: [{
        type: "twitter",
        contact: "@sismo_eth"
      }],
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: []
    },
  ],
};

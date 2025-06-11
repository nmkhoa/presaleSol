/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/unich_presale_contract.json`.
 */
export type UnichPresaleContract = {
  address: "4iw9jAzzC8JRhKDgebeqREJDizaFVdzwdckraxG5yCAz";
  metadata: {
    name: "unichPresaleContract";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "addAdmin";
      discriminator: [177, 236, 33, 205, 124, 152, 55, 186];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "signerAdminAccount";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  65,
                  68,
                  77,
                  73,
                  78,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              },
              {
                kind: "account";
                path: "signer";
              }
            ];
          };
        },
        {
          name: "newAdminAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  65,
                  68,
                  77,
                  73,
                  78,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              },
              {
                kind: "arg";
                path: "newAdmin";
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "newAdmin";
          type: "pubkey";
        }
      ];
    },
    {
      name: "addNft";
      discriminator: [55, 57, 85, 145, 81, 134, 220, 223];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "signerAdminAccount";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  65,
                  68,
                  77,
                  73,
                  78,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              },
              {
                kind: "account";
                path: "signer";
              }
            ];
          };
        },
        {
          name: "nftAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  78,
                  70,
                  84,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              },
              {
                kind: "arg";
                path: "newNft";
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "newNft";
          type: "pubkey";
        }
      ];
    },
    {
      name: "changeRound";
      discriminator: [119, 213, 133, 222, 12, 21, 156, 144];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "signerAdminAccount";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  65,
                  68,
                  77,
                  73,
                  78,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              },
              {
                kind: "account";
                path: "signer";
              }
            ];
          };
        },
        {
          name: "saleAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  83,
                  65,
                  76,
                  69,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "round";
          type: "u8";
        }
      ];
    },
    {
      name: "claimReward";
      discriminator: [149, 95, 181, 242, 94, 90, 158, 162];
      accounts: [
        {
          name: "user";
          writable: true;
          signer: true;
        },
        {
          name: "userAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  85,
                  83,
                  69,
                  82,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              },
              {
                kind: "account";
                path: "user";
              }
            ];
          };
        },
        {
          name: "usdcMint";
          writable: true;
          relations: ["configAccount"];
        },
        {
          name: "userUsdcAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "user";
              },
              {
                kind: "account";
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "usdcMint";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "usdtMint";
          writable: true;
          relations: ["configAccount"];
        },
        {
          name: "userUsdtAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "user";
              },
              {
                kind: "account";
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "usdtMint";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "saleAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  83,
                  65,
                  76,
                  69,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              }
            ];
          };
        },
        {
          name: "saleUsdcAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "saleAccount";
              },
              {
                kind: "account";
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "usdcMint";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "saleUsdtAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "saleAccount";
              },
              {
                kind: "account";
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "usdtMint";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "configAccount";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  67,
                  79,
                  78,
                  70,
                  73,
                  71,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              }
            ];
          };
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "initialize";
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "admin";
        },
        {
          name: "adminAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  65,
                  68,
                  77,
                  73,
                  78,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              },
              {
                kind: "account";
                path: "admin";
              }
            ];
          };
        },
        {
          name: "configAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  67,
                  79,
                  78,
                  70,
                  73,
                  71,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "usdcMint";
          type: "pubkey";
        },
        {
          name: "usdtMint";
          type: "pubkey";
        }
      ];
    },
    {
      name: "initializeSale";
      discriminator: [208, 103, 34, 154, 179, 6, 125, 208];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "signerAdminAccount";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  65,
                  68,
                  77,
                  73,
                  78,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              },
              {
                kind: "account";
                path: "signer";
              }
            ];
          };
        },
        {
          name: "saleAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  83,
                  65,
                  76,
                  69,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              }
            ];
          };
        },
        {
          name: "configAccount";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  67,
                  79,
                  78,
                  70,
                  73,
                  71,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              }
            ];
          };
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "startTime";
          type: "u64";
        },
        {
          name: "endTime";
          type: "u64";
        },
        {
          name: "tokensForSale";
          type: "u64";
        },
        {
          name: "denominator";
          type: "u64";
        },
        {
          name: "firstRoundPrice";
          type: "u64";
        },
        {
          name: "secondRoundPrice";
          type: "u64";
        },
        {
          name: "whitelistDiscount";
          type: "u64";
        },
        {
          name: "minUsdAmount";
          type: "u64";
        },
        {
          name: "maxUsdAmount";
          type: "u64";
        },
        {
          name: "refCurrencyRate";
          type: "u64";
        },
        {
          name: "refTokenRate";
          type: "u64";
        }
      ];
    },
    {
      name: "purchaseTokensWithSol";
      discriminator: [201, 116, 194, 155, 196, 234, 179, 122];
      accounts: [
        {
          name: "buyer";
          writable: true;
          signer: true;
        },
        {
          name: "buyerAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  85,
                  83,
                  69,
                  82,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              },
              {
                kind: "account";
                path: "buyer";
              }
            ];
          };
        },
        {
          name: "referrer";
          optional: true;
        },
        {
          name: "referrerAccount";
          writable: true;
          optional: true;
        },
        {
          name: "saleAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  83,
                  65,
                  76,
                  69,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              }
            ];
          };
        },
        {
          name: "configAccount";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  67,
                  79,
                  78,
                  70,
                  73,
                  71,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              }
            ];
          };
        },
        {
          name: "priceUpdate";
          optional: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "currencyAmount";
          type: "u64";
        }
      ];
    },
    {
      name: "purchaseTokensWithSolWhitelist";
      discriminator: [99, 196, 142, 239, 168, 140, 132, 227];
      accounts: [
        {
          name: "buyer";
          writable: true;
          signer: true;
        },
        {
          name: "buyerAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  85,
                  83,
                  69,
                  82,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              },
              {
                kind: "account";
                path: "buyer";
              }
            ];
          };
        },
        {
          name: "saleAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  83,
                  65,
                  76,
                  69,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              }
            ];
          };
        },
        {
          name: "nftMint";
          writable: true;
        },
        {
          name: "nftAccount";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  78,
                  70,
                  84,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              },
              {
                kind: "account";
                path: "nftMint";
              }
            ];
          };
        },
        {
          name: "buyerNftAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "buyer";
              },
              {
                kind: "account";
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "nftMint";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "configAccount";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  67,
                  79,
                  78,
                  70,
                  73,
                  71,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              }
            ];
          };
        },
        {
          name: "priceUpdate";
          optional: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "currencyAmount";
          type: "u64";
        }
      ];
    },
    {
      name: "purchaseTokensWithUsdc";
      discriminator: [117, 83, 210, 1, 212, 236, 109, 42];
      accounts: [
        {
          name: "buyer";
          writable: true;
          signer: true;
        },
        {
          name: "buyerAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  85,
                  83,
                  69,
                  82,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              },
              {
                kind: "account";
                path: "buyer";
              }
            ];
          };
        },
        {
          name: "referrer";
          optional: true;
        },
        {
          name: "referrerAccount";
          writable: true;
          optional: true;
        },
        {
          name: "usdcMint";
          writable: true;
          relations: ["configAccount"];
        },
        {
          name: "saleAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  83,
                  65,
                  76,
                  69,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              }
            ];
          };
        },
        {
          name: "saleUsdcAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "saleAccount";
              },
              {
                kind: "account";
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "usdcMint";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "buyerUsdcAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "buyer";
              },
              {
                kind: "account";
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "usdcMint";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "configAccount";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  67,
                  79,
                  78,
                  70,
                  73,
                  71,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              }
            ];
          };
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "currencyAmount";
          type: "u64";
        }
      ];
    },
    {
      name: "purchaseTokensWithUsdcWhitelist";
      discriminator: [103, 83, 109, 250, 54, 55, 161, 153];
      accounts: [
        {
          name: "buyer";
          writable: true;
          signer: true;
        },
        {
          name: "buyerAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  85,
                  83,
                  69,
                  82,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              },
              {
                kind: "account";
                path: "buyer";
              }
            ];
          };
        },
        {
          name: "usdcMint";
          writable: true;
          relations: ["configAccount"];
        },
        {
          name: "saleAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  83,
                  65,
                  76,
                  69,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              }
            ];
          };
        },
        {
          name: "saleUsdcAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "saleAccount";
              },
              {
                kind: "account";
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "usdcMint";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "buyerUsdcAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "buyer";
              },
              {
                kind: "account";
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "usdcMint";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "nftMint";
          writable: true;
        },
        {
          name: "nftAccount";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  78,
                  70,
                  84,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              },
              {
                kind: "account";
                path: "nftMint";
              }
            ];
          };
        },
        {
          name: "buyerNftAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "buyer";
              },
              {
                kind: "account";
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "nftMint";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "configAccount";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  67,
                  79,
                  78,
                  70,
                  73,
                  71,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              }
            ];
          };
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "currencyAmount";
          type: "u64";
        }
      ];
    },
    {
      name: "purchaseTokensWithUsdt";
      discriminator: [197, 159, 48, 11, 140, 182, 7, 114];
      accounts: [
        {
          name: "buyer";
          writable: true;
          signer: true;
        },
        {
          name: "buyerAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  85,
                  83,
                  69,
                  82,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              },
              {
                kind: "account";
                path: "buyer";
              }
            ];
          };
        },
        {
          name: "referrer";
          optional: true;
        },
        {
          name: "referrerAccount";
          writable: true;
          optional: true;
        },
        {
          name: "usdtMint";
          writable: true;
          relations: ["configAccount"];
        },
        {
          name: "saleAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  83,
                  65,
                  76,
                  69,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              }
            ];
          };
        },
        {
          name: "saleUsdtAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "saleAccount";
              },
              {
                kind: "account";
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "usdtMint";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "buyerUsdtAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "buyer";
              },
              {
                kind: "account";
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "usdtMint";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "configAccount";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  67,
                  79,
                  78,
                  70,
                  73,
                  71,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              }
            ];
          };
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "currencyAmount";
          type: "u64";
        }
      ];
    },
    {
      name: "purchaseTokensWithUsdtWhitelist";
      discriminator: [64, 219, 145, 209, 228, 219, 26, 177];
      accounts: [
        {
          name: "buyer";
          writable: true;
          signer: true;
        },
        {
          name: "buyerAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  85,
                  83,
                  69,
                  82,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              },
              {
                kind: "account";
                path: "buyer";
              }
            ];
          };
        },
        {
          name: "usdtMint";
          writable: true;
          relations: ["configAccount"];
        },
        {
          name: "saleAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  83,
                  65,
                  76,
                  69,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              }
            ];
          };
        },
        {
          name: "saleUsdtAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "saleAccount";
              },
              {
                kind: "account";
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "usdtMint";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "buyerUsdtAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "buyer";
              },
              {
                kind: "account";
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "usdtMint";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "nftMint";
          writable: true;
        },
        {
          name: "nftAccount";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  78,
                  70,
                  84,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              },
              {
                kind: "account";
                path: "nftMint";
              }
            ];
          };
        },
        {
          name: "buyerNftAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "buyer";
              },
              {
                kind: "account";
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "nftMint";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "configAccount";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  67,
                  79,
                  78,
                  70,
                  73,
                  71,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              }
            ];
          };
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "currencyAmount";
          type: "u64";
        }
      ];
    },
    {
      name: "removeAdmin";
      discriminator: [74, 202, 71, 106, 252, 31, 72, 183];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "signerAdminAccount";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  65,
                  68,
                  77,
                  73,
                  78,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              },
              {
                kind: "account";
                path: "signer";
              }
            ];
          };
        },
        {
          name: "adminAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  65,
                  68,
                  77,
                  73,
                  78,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              },
              {
                kind: "arg";
                path: "admin";
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "admin";
          type: "pubkey";
        }
      ];
    },
    {
      name: "updateContractStatus";
      discriminator: [131, 188, 75, 62, 150, 188, 224, 131];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "signerAdminAccount";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  65,
                  68,
                  77,
                  73,
                  78,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              },
              {
                kind: "account";
                path: "signer";
              }
            ];
          };
        },
        {
          name: "configAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  67,
                  79,
                  78,
                  70,
                  73,
                  71,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "isActive";
          type: "bool";
        }
      ];
    },
    {
      name: "updateSaleStatus";
      discriminator: [237, 170, 8, 67, 8, 96, 85, 14];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "signerAdminAccount";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  65,
                  68,
                  77,
                  73,
                  78,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              },
              {
                kind: "account";
                path: "signer";
              }
            ];
          };
        },
        {
          name: "saleAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  83,
                  65,
                  76,
                  69,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "isActive";
          type: "bool";
        }
      ];
    },
    {
      name: "updateTokenPrice";
      discriminator: [155, 148, 125, 15, 147, 1, 126, 60];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "signerAdminAccount";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  65,
                  68,
                  77,
                  73,
                  78,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              },
              {
                kind: "account";
                path: "signer";
              }
            ];
          };
        },
        {
          name: "saleAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  83,
                  65,
                  76,
                  69,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "firstSalePrice";
          type: {
            option: "u64";
          };
        },
        {
          name: "secondSalePrice";
          type: {
            option: "u64";
          };
        }
      ];
    },
    {
      name: "withdrawSol";
      discriminator: [145, 131, 74, 136, 65, 137, 42, 38];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "signerAdminAccount";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  65,
                  68,
                  77,
                  73,
                  78,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              },
              {
                kind: "account";
                path: "signer";
              }
            ];
          };
        },
        {
          name: "receiver";
          writable: true;
        },
        {
          name: "saleAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  83,
                  65,
                  76,
                  69,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              }
            ];
          };
        },
        {
          name: "configAccount";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  67,
                  79,
                  78,
                  70,
                  73,
                  71,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              }
            ];
          };
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "withdrawUsdc";
      discriminator: [114, 49, 72, 184, 27, 156, 243, 155];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "signerAdminAccount";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  65,
                  68,
                  77,
                  73,
                  78,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              },
              {
                kind: "account";
                path: "signer";
              }
            ];
          };
        },
        {
          name: "receiver";
          writable: true;
        },
        {
          name: "usdcMint";
          writable: true;
          relations: ["configAccount"];
        },
        {
          name: "saleAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  83,
                  65,
                  76,
                  69,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              }
            ];
          };
        },
        {
          name: "saleUsdcAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "saleAccount";
              },
              {
                kind: "account";
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "usdcMint";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "receiverUsdcAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "receiver";
              },
              {
                kind: "account";
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "usdcMint";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "configAccount";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  67,
                  79,
                  78,
                  70,
                  73,
                  71,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              }
            ];
          };
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "withdrawUsdt";
      discriminator: [117, 75, 94, 162, 178, 92, 19, 141];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "signerAdminAccount";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  65,
                  68,
                  77,
                  73,
                  78,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              },
              {
                kind: "account";
                path: "signer";
              }
            ];
          };
        },
        {
          name: "receiver";
          writable: true;
        },
        {
          name: "usdtMint";
          writable: true;
          relations: ["configAccount"];
        },
        {
          name: "saleAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  83,
                  65,
                  76,
                  69,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              }
            ];
          };
        },
        {
          name: "saleUsdtAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "saleAccount";
              },
              {
                kind: "account";
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "usdtMint";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "receiverUsdtAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "receiver";
              },
              {
                kind: "account";
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "usdtMint";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "configAccount";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  67,
                  79,
                  78,
                  70,
                  73,
                  71,
                  95,
                  65,
                  67,
                  67,
                  79,
                  85,
                  78,
                  84,
                  95,
                  83,
                  69,
                  69,
                  68
                ];
              }
            ];
          };
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "adminAccount";
      discriminator: [153, 119, 180, 178, 43, 66, 235, 148];
    },
    {
      name: "configAccount";
      discriminator: [189, 255, 97, 70, 186, 189, 24, 102];
    },
    {
      name: "nftAccount";
      discriminator: [45, 29, 251, 53, 216, 110, 121, 151];
    },
    {
      name: "priceUpdateV2";
      discriminator: [34, 241, 35, 99, 157, 126, 244, 205];
    },
    {
      name: "saleAccount";
      discriminator: [213, 18, 87, 228, 218, 230, 207, 182];
    },
    {
      name: "userAccount";
      discriminator: [211, 33, 136, 16, 186, 110, 242, 127];
    }
  ];
  events: [
    {
      name: "nftAdded";
      discriminator: [46, 234, 178, 71, 6, 188, 2, 64];
    },
    {
      name: "referralRewardClaimed";
      discriminator: [56, 212, 222, 36, 145, 243, 229, 103];
    },
    {
      name: "tokenPurchased";
      discriminator: [3, 73, 186, 50, 15, 181, 213, 37];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "unauthorized";
      msg: "unauthorized";
    },
    {
      code: 6001;
      name: "invalidTime";
      msg: "invalidTime";
    },
    {
      code: 6002;
      name: "invalidSalePrice";
      msg: "invalidSalePrice";
    },
    {
      code: 6003;
      name: "invalidTokensForSale";
      msg: "invalidTokensForSale";
    },
    {
      code: 6004;
      name: "invalidSaleStatus";
      msg: "invalidSaleStatus";
    },
    {
      code: 6005;
      name: "incorrectReferrerAccount";
      msg: "incorrectReferrerAccount";
    },
    {
      code: 6006;
      name: "invalidUsdAmountRange";
      msg: "invalidUsdAmountRange";
    },
    {
      code: 6007;
      name: "invalidRound";
      msg: "invalidRound";
    },
    {
      code: 6008;
      name: "inactiveSale";
      msg: "inactiveSale";
    },
    {
      code: 6009;
      name: "inactiveContract";
      msg: "inactiveContract";
    },
    {
      code: 6010;
      name: "invalidBuyAmount";
      msg: "invalidBuyAmount";
    },
    {
      code: 6011;
      name: "insufficientBalance";
      msg: "insufficientBalance";
    },
    {
      code: 6012;
      name: "notEnoughTokenForSale";
      msg: "notEnoughTokenForSale";
    },
    {
      code: 6013;
      name: "saleAlreadyCompleted";
      msg: "saleAlreadyCompleted";
    },
    {
      code: 6014;
      name: "saleNotStartedYet";
      msg: "saleNotStartedYet";
    },
    {
      code: 6015;
      name: "saleEnded";
      msg: "saleEnded";
    },
    {
      code: 6016;
      name: "saleCompleted";
      msg: "saleCompleted";
    },
    {
      code: 6017;
      name: "cannotReferSelf";
      msg: "cannotReferSelf";
    },
    {
      code: 6018;
      name: "negativePrice";
      msg: "negativePrice";
    },
    {
      code: 6019;
      name: "invalidWhitelistDiscount";
      msg: "invalidWhitelistDiscount";
    },
    {
      code: 6020;
      name: "insufficientNftBalance";
      msg: "insufficientNftBalance";
    },
    {
      code: 6021;
      name: "noClaimableReferral";
      msg: "noClaimableReferral";
    },
    {
      code: 6022;
      name: "invalidPriceUpdate";
      msg: "invalidPriceUpdate";
    },
    {
      code: 6023;
      name: "invalidContractStatus";
      msg: "invalidContractStatus";
    },
    {
      code: 6024;
      name: "alreadyAdmin";
      msg: "alreadyAdmin";
    },
    {
      code: 6025;
      name: "notAdmin";
      msg: "notAdmin";
    },
    {
      code: 6026;
      name: "cannotRemoveSelf";
      msg: "cannotRemoveSelf";
    },
    {
      code: 6027;
      name: "invalidWithdrawAmount";
      msg: "invalidWithdrawAmount";
    },
    {
      code: 6028;
      name: "alreadyNft";
      msg: "alreadyNft";
    },
    {
      code: 6029;
      name: "invalidNft";
      msg: "invalidNft";
    },
    {
      code: 6030;
      name: "invalidNftAmount";
      msg: "invalidNftAmount";
    }
  ];
  types: [
    {
      name: "adminAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "isAdmin";
            type: "bool";
          }
        ];
      };
    },
    {
      name: "configAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "isActive";
            type: "bool";
          },
          {
            name: "usdcMint";
            type: "pubkey";
          },
          {
            name: "usdcDecimals";
            type: "u8";
          },
          {
            name: "usdtMint";
            type: "pubkey";
          },
          {
            name: "usdtDecimals";
            type: "u8";
          },
          {
            name: "tokenDecimals";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "nftAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "isWhitelistNft";
            type: "bool";
          }
        ];
      };
    },
    {
      name: "nftAdded";
      type: {
        kind: "struct";
        fields: [
          {
            name: "admin";
            type: "pubkey";
          },
          {
            name: "nftAddress";
            type: "pubkey";
          }
        ];
      };
    },
    {
      name: "priceFeedMessage";
      repr: {
        kind: "c";
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "feedId";
            docs: [
              "`FeedId` but avoid the type alias because of compatibility issues with Anchor's `idl-build` feature."
            ];
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "price";
            type: "i64";
          },
          {
            name: "conf";
            type: "u64";
          },
          {
            name: "exponent";
            type: "i32";
          },
          {
            name: "publishTime";
            docs: ["The timestamp of this price update in seconds"];
            type: "i64";
          },
          {
            name: "prevPublishTime";
            docs: [
              "The timestamp of the previous price update. This field is intended to allow users to",
              "identify the single unique price update for any moment in time:",
              "for any time t, the unique update is the one such that prev_publish_time < t <= publish_time.",
              "",
              "Note that there may not be such an update while we are migrating to the new message-sending logic,",
              "as some price updates on pythnet may not be sent to other chains (because the message-sending",
              "logic may not have triggered). We can solve this problem by making the message-sending mandatory",
              "(which we can do once publishers have migrated over).",
              "",
              "Additionally, this field may be equal to publish_time if the message is sent on a slot where",
              "where the aggregation was unsuccesful. This problem will go away once all publishers have",
              "migrated over to a recent version of pyth-agent."
            ];
            type: "i64";
          },
          {
            name: "emaPrice";
            type: "i64";
          },
          {
            name: "emaConf";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "priceUpdateV2";
      docs: [
        "A price update account. This account is used by the Pyth Receiver program to store a verified price update from a Pyth price feed.",
        "It contains:",
        "- `write_authority`: The write authority for this account. This authority can close this account to reclaim rent or update the account to contain a different price update.",
        "- `verification_level`: The [`VerificationLevel`] of this price update. This represents how many Wormhole guardian signatures have been verified for this price update.",
        "- `price_message`: The actual price update.",
        "- `posted_slot`: The slot at which this price update was posted."
      ];
      type: {
        kind: "struct";
        fields: [
          {
            name: "writeAuthority";
            type: "pubkey";
          },
          {
            name: "verificationLevel";
            type: {
              defined: {
                name: "verificationLevel";
              };
            };
          },
          {
            name: "priceMessage";
            type: {
              defined: {
                name: "priceFeedMessage";
              };
            };
          },
          {
            name: "postedSlot";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "referralRewardClaimed";
      type: {
        kind: "struct";
        fields: [
          {
            name: "user";
            type: "pubkey";
          },
          {
            name: "solAmount";
            type: "u64";
          },
          {
            name: "usdcAmount";
            type: "u64";
          },
          {
            name: "usdtAmount";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "saleAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "startTime";
            type: "u64";
          },
          {
            name: "endTime";
            type: "u64";
          },
          {
            name: "tokensForSale";
            type: "u64";
          },
          {
            name: "tokensSold";
            type: "u64";
          },
          {
            name: "denominator";
            type: "u64";
          },
          {
            name: "firstRoundPrice";
            type: "u64";
          },
          {
            name: "secondRoundPrice";
            type: "u64";
          },
          {
            name: "whitelistDiscount";
            type: "u64";
          },
          {
            name: "currentRound";
            type: "u8";
          },
          {
            name: "minUsdAmount";
            type: "u64";
          },
          {
            name: "maxUsdAmount";
            type: "u64";
          },
          {
            name: "solRaised";
            type: "u64";
          },
          {
            name: "usdcRaised";
            type: "u64";
          },
          {
            name: "usdtRaised";
            type: "u64";
          },
          {
            name: "usdRaised";
            type: "u64";
          },
          {
            name: "refCurrencyRate";
            type: "u64";
          },
          {
            name: "refTokenRate";
            type: "u64";
          },
          {
            name: "isActive";
            type: "bool";
          },
          {
            name: "isCompleted";
            type: "bool";
          }
        ];
      };
    },
    {
      name: "tokenPurchased";
      type: {
        kind: "struct";
        fields: [
          {
            name: "buyer";
            type: "pubkey";
          },
          {
            name: "referrer";
            type: "pubkey";
          },
          {
            name: "currency";
            type: "string";
          },
          {
            name: "currencyAmount";
            type: "u64";
          },
          {
            name: "tokenAmount";
            type: "u64";
          },
          {
            name: "tokenPrice";
            type: "u64";
          },
          {
            name: "currencyPrice";
            type: "u64";
          },
          {
            name: "denominator";
            type: "u64";
          },
          {
            name: "purchaseType";
            type: "string";
          },
          {
            name: "referralCurrencyReward";
            type: "u64";
          },
          {
            name: "referralTokenReward";
            type: "u64";
          },
          {
            name: "nftAddress";
            type: "pubkey";
          }
        ];
      };
    },
    {
      name: "userAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "referrer";
            type: "pubkey";
          },
          {
            name: "solSpent";
            type: "u64";
          },
          {
            name: "usdcSpent";
            type: "u64";
          },
          {
            name: "usdtSpent";
            type: "u64";
          },
          {
            name: "usdSpent";
            type: "u64";
          },
          {
            name: "tokensPurchased";
            type: "u64";
          },
          {
            name: "whitelistTokensPurchased";
            type: "u64";
          },
          {
            name: "publicTokensPurchased";
            type: "u64";
          },
          {
            name: "tokenRefEarned";
            type: "u64";
          },
          {
            name: "solRefEarned";
            type: "u64";
          },
          {
            name: "usdcRefEarned";
            type: "u64";
          },
          {
            name: "usdtRefEarned";
            type: "u64";
          },
          {
            name: "solRefClaimed";
            type: "u64";
          },
          {
            name: "usdcRefClaimed";
            type: "u64";
          },
          {
            name: "usdtRefClaimed";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "verificationLevel";
      docs: [
        "Pyth price updates are bridged to all blockchains via Wormhole.",
        "Using the price updates on another chain requires verifying the signatures of the Wormhole guardians.",
        "The usual process is to check the signatures for two thirds of the total number of guardians, but this can be cumbersome on Solana because of the transaction size limits,",
        "so we also allow for partial verification.",
        "",
        "This enum represents how much a price update has been verified:",
        "- If `Full`, we have verified the signatures for two thirds of the current guardians.",
        "- If `Partial`, only `num_signatures` guardian signatures have been checked.",
        "",
        "# Warning",
        "Using partially verified price updates is dangerous, as it lowers the threshold of guardians that need to collude to produce a malicious price update."
      ];
      type: {
        kind: "enum";
        variants: [
          {
            name: "partial";
            fields: [
              {
                name: "numSignatures";
                type: "u8";
              }
            ];
          },
          {
            name: "full";
          }
        ];
      };
    }
  ];
  constants: [
    {
      name: "adminAccountSeed";
      type: "bytes";
      value: "[65, 68, 77, 73, 78, 95, 65, 67, 67, 79, 85, 78, 84, 95, 83, 69, 69, 68]";
    },
    {
      name: "configAccountSeed";
      type: "bytes";
      value: "[67, 79, 78, 70, 73, 71, 95, 65, 67, 67, 79, 85, 78, 84, 95, 83, 69, 69, 68]";
    },
    {
      name: "initSaleAccountLamports";
      type: "u32";
      value: "1858320";
    },
    {
      name: "minSolRewardToClaim";
      type: "u32";
      value: "10000000";
    },
    {
      name: "minUsdcRewardToClaim";
      type: "u32";
      value: "10000";
    },
    {
      name: "minUsdtRewardToClaim";
      type: "u32";
      value: "10000";
    },
    {
      name: "nftAccountSeed";
      type: "bytes";
      value: "[78, 70, 84, 95, 65, 67, 67, 79, 85, 78, 84, 95, 83, 69, 69, 68]";
    },
    {
      name: "saleAccountSeed";
      type: "bytes";
      value: "[83, 65, 76, 69, 95, 65, 67, 67, 79, 85, 78, 84, 95, 83, 69, 69, 68]";
    },
    {
      name: "usdDecimals";
      type: "u8";
      value: "6";
    },
    {
      name: "usdPerDiscountNft";
      type: "u16";
      value: "500";
    },
    {
      name: "userAccountSeed";
      type: "bytes";
      value: "[85, 83, 69, 82, 95, 65, 67, 67, 79, 85, 78, 84, 95, 83, 69, 69, 68]";
    }
  ];
};

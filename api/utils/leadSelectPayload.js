module.exports = function ( leadModel ) {
  const payload = {
    rootSchemaName: "Lead",
    operationType: 1,
    includeProcessExecutionData: true,
    columnValues: {
      items: {
        CreatedBy: {
          expressionType: 2,
          parameter: {
            dataValueType: 10,
            value: "410006e1-ca4e-4502-a9ec-e54d922d2c00",
          },
        },
        ModifiedBy: {
          expressionType: 2,
          parameter: {
            dataValueType: 10,
            value: "410006e1-ca4e-4502-a9ec-e54d922d2c00",
          },
        },
        DoNotUseEmail: {
          expressionType: 2,
          parameter: {
            dataValueType: 12,
            value: false,
          },
        },
        DoNotUsePhone: {
          expressionType: 2,
          parameter: {
            dataValueType: 12,
            value: false,
          },
        },
        DoNotUseFax: {
          expressionType: 2,
          parameter: {
            dataValueType: 12,
            value: false,
          },
        },
        DoNotUseSMS: {
          expressionType: 2,
          parameter: {
            dataValueType: 12,
            value: false,
          },
        },
        DoNotUseMail: {
          expressionType: 2,
          parameter: {
            dataValueType: 12,
            value: false,
          },
        },
        LeadTypeStatus: {
          expressionType: 2,
          parameter: {
            dataValueType: 10,
            value: "5b3d1046-fc16-45c8-a5a1-298dfc857546",
          },
        },
        ShowDistributionPage: {
          expressionType: 2,
          parameter: {
            dataValueType: 12,
            value: true,
          },
        },
        RegisterMethod: {
          expressionType: 2,
          parameter: {
            dataValueType: 10,
            value: "240ab9c6-4d7c-4688-b380-af44dd147d7a",
          },
        },
        StartLeadManagementProcess: {
          expressionType: 2,
          parameter: {
            dataValueType: 12,
            value: false,
          },
        },
        SaleType: {
          expressionType: 2,
          parameter: {
            dataValueType: 1,
            value: "Opportunity",
          },
        },
        SalesChannel: {
          expressionType: 2,
          parameter: {
            dataValueType: 10,
            value: "3c3865f2-ada4-480c-ac91-e2d39c5bbaf9",
          },
        },
        Contact: {
          expressionType: 2,
          parameter: {
            dataValueType: 1,
            value: leadModel.firstName + " " + leadModel.lastName,
          },
        },
        Commentary: {
          expressionType: 2,
          parameter: {
            dataValueType: 1,
            value: leadModel.message,
          },
        },
        Email: {
          expressionType: 2,
          parameter: {
            dataValueType: 1,
            value: leadModel.email,
          },
        },
        LeadType: {
          expressionType: 2,
          parameter: {
            dataValueType: 10,
            value: leadModel.interest,
          },
        },
        LeadMedium: {
          expressionType: 2,
          parameter: {
            dataValueType: 10,
            value: leadModel.leadMedium,
          },
        },
        LeadSource: {
          expressionType: 2,
          parameter: {
            dataValueType: 10,
            value: leadModel.leadSource,
          },
        },
        Address: {
          expressionType: 2,
          parameter: {
            dataValueType: 1,
            value: leadModel.streetAddress,
          },
        },
        UsrAddress2: {
          expressionType: 2,
          parameter: {
            dataValueType: 1,
            value: leadModel.addressLine2,
          },
        },
        Country: {
          expressionType: 2,
          parameter: {
            dataValueType: 10,
            value: "e0be1264-f36b-1410-fa98-00155d043204",
          },
        },
        Region: {
          expressionType: 2,
          parameter: {
            dataValueType: 10,
            value: leadModel.state,
          },
        },
        City: {
          expressionType: 2,
          parameter: {
            dataValueType: 10,
            value: leadModel.city,
          },
        },
        Zip: {
          expressionType: 2,
          parameter: {
            dataValueType: 1,
            value: leadModel.zipCode,
          },
        },
        UsrPrimaryPhone: {
          expressionType: 2,
          parameter: {
            dataValueType: 1,
            value: leadModel.phone,
          },
        },
        UsrUtmCampaign: {
          expressionType: 2,
          parameter: {
            dataValueType: 1,
            value: leadModel.utmCampaign,
          },
        },
        UsrUtmMedium: {
          expressionType: 2,
          parameter: {
            dataValueType: 1,
            value: leadModel.utmMedium,
          },
        },
        UsrUtmSource: {
          expressionType: 2,
          parameter: {
            dataValueType: 1,
            value: leadModel.utmSource,
          },
        },
        UsrAdSource: {
          expressionType: 2,
          parameter: {
            dataValueType: 1,
            value: leadModel.adSrc,
          },
        },
        UsrIsWeb: {
          expressionType: 2,
          parameter: {
            dataValueType: 12,
            value: true,
          },
        },
        UsrPoolType: {
          expressionType: 2,
          parameter: {
            dataValueType: 10,
            value: leadModel.poolType,
          },
        },
        UsrReferingAmbassadorShortCode: {
          expressionType: 2,
          parameter: {
            dataValueType: 1,
            value: leadModel.shortCode,
          },
        },
      },
    },
  };

  return payload;
};

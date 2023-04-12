import axios from "axios";

export function createCSGOImage ( urlEndpath : string ) : string {
  return 'https://images.skinledger.com/counterstrike/' + urlEndpath + '.png'
}

export async function getURL(steamID: string): Promise<string | void> {
  let defaultReturnString = createCSGOImage("econ/characters/customplayer_tm_separatist")
    return new Promise<string>((resolve) => {
       axios
        .get(`https://steamcommunity.com/profiles/${steamID}/?xml=1`)
        .then(function(response) {
        const parser = new DOMParser();
        resolve(parser?.parseFromString(response.data,"text/xml")?.getElementsByTagName("profile")[0]?.getElementsByTagName("avatarMedium")[0]?.childNodes[0]?.nodeValue || defaultReturnString
		)
	    })
    }).catch(error => console.log(error));
}

export const getProfilePicture = async (steamID: string): Promise<string> => {

  try {
    const profilePicture = await getURL(steamID);
    return profilePicture as string;
  } catch (error) {
    return createCSGOImage("econ/characters/customplayer_tm_separatist");
  }
}

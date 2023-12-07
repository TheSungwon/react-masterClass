//https://styled-components.com/docs/api#typescript
// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    // borderRadius: string;

    // colors: {
    //   main: string;
    //   secondary: string;
    // };

    textColor?: string;
    bgColor?: string;
    // btnColor: string;
    accentColor?: string;
    //
    cardColor?: string;
    boardColor?: string;

    //netflix lecture
    red?: string;
    black?: { verDark?: string; darker?: string; lighter?: string };
    white?: {
      lighter: ?string;
      darker?: string;
    };
  }
}

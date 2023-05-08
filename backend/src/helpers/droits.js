// import { AbilityBuilder, createMongoAbility} from '@casl/ability';
// import { UtilisateurModel } from "../models";


// const User = new UtilisateurModel;

// /**
//  * @param user contains details about logged in user: its id, name, email, etc
//  */

// export function defineAbilitiesFor(User) {
//     const { can, cannot, rules} = new AbilityBuilder(createMongoAbility);
//     if (User && User.role) {
//         switch (User.role) {
//             case RoleEnum.admin:
//                 defineAdminRoles(can, cannot);
//                 break;
        
//             case RoleEnum.author:
//                 defineAuthorRoles(User, can, cannot);
//                 break;

//             case RoleEnum.contributor:
//                 defineContributorRoles(User, can, cannot);
//                 break;

//             default:
//                 defineContributorRoles(User, can, cannot);
//                 break;
//         }
        
//     }
//     return rules;
// }


// function defineAdminRoles(can, cannot) {
//     can('manage', 'all');
// }

// function defineAuthorRoles(User, can, cannot) {
//     can(['create', 'read'], 'Fichier');

//     can(['delete', "update"], 'Fichier', {
//         'createdBy.username': User.name,
//     });

//     can('read', 'Users');
// }

// function defineContributorRoles(User, can, cannot) {
//     can(['read', 'update'], 'Fichier', {
//         'contributors.username': User.name,
//       });
    
//       can('read', 'Users');
// }
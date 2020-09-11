package com.project.react.controller;

import com.project.react.Exception.ModelConflictException;
import com.project.react.Exception.NonPositiveValueException;
import com.project.react.model.*;
import com.project.react.restModel.*;
import com.project.react.service.interfaces.TargetService;
import com.project.react.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@CrossOrigin(origins = {"http://mywallet.atkev.site", "http://localhost:3000"})
@RequestMapping("/api/target")
public class TargetController {
    @Autowired
    private TargetService targetService;

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/template")
    private ResponseEntity<?> getTemplate() {
        TargetModel newModel = new TargetModel();
        newModel.setAccountModel(new AccountModel());
        newModel.setCategoryModel(new CategoryModel());
        return ResponseEntity.ok()
                .body(new BaseResponse<TargetModel>(200, "empty target model",
                        newModel));
    }

    @RequestMapping(value = "/request-template")
    private ResponseEntity<?> getRequestTemplate() {
        return ResponseEntity.ok().body(
                new BaseResponse<TargetRequest>(200, "empty target request model",
                        new TargetRequest("", "", 0L, "", "")));
    }

    @GetMapping(value = "/all")
    private ResponseEntity<?> retrieveAll(@AuthenticationPrincipal UserDetails userDetails) {
        UserModel user = userService.getByUsername(userDetails.getUsername()).get();
        List<TargetResponse> targets = targetService.getAll(user);
        return ResponseEntity.ok().body(
                new BaseResponse<List<TargetResponse>>(200, userDetails.getUsername() + "'s target list", targets));
    }

    @PostMapping(value = "/add")
    ResponseEntity<?> addTransaction(@AuthenticationPrincipal UserDetails userDetails, @Valid @RequestBody TargetTransactionRequest request) {
        try {
            if (!request.getTargetId().isPresent()
                    || request.getTargetId().get().trim().isEmpty()
                    || !request.getAmount().isPresent()
                    || !request.getDate().isPresent()) {
                throw new NullPointerException();
            } else if (request.getAmount().get() <= 0L) {
                throw new NonPositiveValueException();
            }
            TransactionModel transaction = targetService.addTransaction(request);
            return ResponseEntity.ok()
                    .body(new BaseResponse<TransactionModel>(200, "target transaction created successfully", transaction));
        } catch (NonPositiveValueException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "non positive value exception", e.getMessage()));
        } catch (NullPointerException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "null pointer exception", e.getMessage()));
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "no such element exception", e.getMessage()));
        }
    }

    @PutMapping
    ResponseEntity<?> putModel(@AuthenticationPrincipal UserDetails userDetails, @Valid @RequestBody TargetRequest request) {
        try {
            if (!request.getId().isPresent()
                    || !request.getName().isPresent()
                    || !request.getValue().isPresent()
                    || request.getName().get().trim().isEmpty()) {
                throw new NullPointerException();
            } else if (request.getValue().get() < 0L) {
                throw new NonPositiveValueException();
            }
            UserModel user = userService.getByUsername(userDetails.getUsername()).get();
            TargetModel target = targetService.update(request, user);
            return ResponseEntity.ok().body(new BaseResponse<TargetModel>(200, "target successfully updated", target));
        } catch (AccessDeniedException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<String>(400, "request is unauthorized", e.getMessage()));
        } catch (NullPointerException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<String>(400, "null pointer exception", e.getMessage()));
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<String>(400, "no such element exception", e.getMessage()));
        } catch (ModelConflictException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "target name already existed", e.getMessage()));
        } catch (NonPositiveValueException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "non positive value exception", e.getMessage()));
        }
    }

    @DeleteMapping(value = "/end")
    public ResponseEntity<?> endTargetModel(@AuthenticationPrincipal UserDetails userDetails, @Valid @RequestBody String id) {
        try {
            UserModel user = userService.getByUsername(userDetails.getUsername()).get();
            TargetModel target = targetService.endTarget(id, user);
            return ResponseEntity.ok()
                    .body(new BaseResponse<TargetModel>(200, "target successfully ended", target));
        } catch (AccessDeniedException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "request is unauthorized", ""));
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "no such element exception", ""));
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteModel(@AuthenticationPrincipal UserDetails userDetails, @Valid @RequestBody String id) {
        try {
            UserModel user = userService.getByUsername(userDetails.getUsername()).get();
            TargetModel target = targetService.delete(id, user);
            return ResponseEntity.ok()
                    .body(new BaseResponse<TargetModel>(200, "target successfully deleted", target));
        } catch (AccessDeniedException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "request is unauthorized", ""));
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "no such element exception", ""));
        }
    }

    @PostMapping
    public ResponseEntity<?> postModel(@AuthenticationPrincipal UserDetails userDetails, @Valid @RequestBody TargetRequest request) {
        try {
            if (request.getName().get().trim().isEmpty()
                    || request.getAccountId().get().trim().isEmpty()
                    || request.getCategoryId().get().trim().isEmpty()) {
                throw new NullPointerException();
            } else if (request.getValue().get() < 0L) {
                throw new NonPositiveValueException();
            }
            UserModel user = userService.getByUsername(userDetails.getUsername()).get();
            TargetModel newTarget = targetService.create(request, user);
            return ResponseEntity.ok().body(new BaseResponse<Object>(200, "target successfully created", newTarget));
        } catch (ModelConflictException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "target name already existed", e.getMessage()));
        } catch (NullPointerException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "null pointer exception", e.getMessage()));
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "no such element exception", e.getMessage()));
        } catch (NonPositiveValueException e) {
            return ResponseEntity.badRequest().body(new BaseResponse<Object>(400, "non positive value exception", e.getMessage()));
        }
    }
}